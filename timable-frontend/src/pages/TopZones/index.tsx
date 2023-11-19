import { FC } from "react";
import "./index.styles.css";
import ZonesMap from "../../components/ZonesMap";
import "./index.styles.css";
import StaticCards from "../../components/StatisticCards";
import { InfoCircleOutlined } from "@ant-design/icons";

const TopZones: FC = () => {
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
                Score— 1 to 10. Higher scores mean better accessibility. Hover to see the score.
              </div>
            </div>
          </span>
        </div>
        <div className="zoneMapsBigContainer">
          <ZonesMap />
        </div>
      </div>
      <div className="staticCardsTopZones">
        <StaticCards />
      </div>
    </div>
  );
};

export default TopZones;
