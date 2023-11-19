import { FC, useEffect, useState } from "react";
import "./index.styles.css";
import ZonesMap from "../../components/ZonesMap";
import "./index.styles.css";
import StaticCards from "../../components/StatisticCards";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { GetPinModel } from "../../models/pin-model";
import { StatusEnum } from "../../utils/constants";

const TopZones: FC = () => {
  const [pins, setPins] = useState<Array<GetPinModel>>([]);
  const [cityAverage, setCityAverage] = useState<number>();
  const [firstThree, setFirstThree] = useState<[string, unknown][]>([]);

  useEffect(() => {
    const getPins = async () => {
      const allPins = await axios.get("http://localhost:8000/pin");
      setPins(allPins.data);
    };
    getPins();
  }, []);

  useEffect(() => {
    const getStatistics = async () => {
      const statistics = await axios.get(
        "http://localhost:8000/statistics/area-accessibility-score"
      );
      let counter = 0;
      let sum = 0;
      if (statistics.data) {
        Object.entries(statistics.data).forEach(([key, value]: any) => {
          counter = counter + 1;
          sum = sum + value;
        });
        setCityAverage(counter ? sum / counter : 0);
        const sortedArray = Object.entries(statistics.data).sort(
          ([, valueA]: any, [, valueB]: any) => {
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
          }
        );
        setFirstThree(
          sortedArray.slice(sortedArray.length - 3, sortedArray.length)
        );
      }
    };
    getStatistics();
  }, []);

  return (
    <div className="topZonesPageContainer">
      <div className="mapBigContainer">
        <div className="mapTitle">
          City zones urban accessibility - Mapping the city zones based on
          Accessibility Scores and Inclusivity
          <span className="tooltipIcon">
            <div className="tooltip-container">
              <InfoCircleOutlined />
              <div className="tooltipStatisticCards">
                City Accessibility Map: Discover each zone's Accessibility
                Score— 1 to 10. Higher scores mean better accessibility. Hover
                to see the score.
              </div>
            </div>
          </span>
        </div>
        <div className="zoneMapsBigContainer">
          <ZonesMap />
        </div>
      </div>
      <div className="staticCardsTopZones">
        <StaticCards
          totalPins={pins.length}
          closedPins={
            pins.filter((pin) => pin.status === StatusEnum.CLOSED).length
          }
          cityAverage={cityAverage ?? 0}
          topZones={firstThree}
        />
      </div>
    </div>
  );
};

export default TopZones;
