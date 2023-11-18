import { FC } from "react";
import "./index.styles.css";
import ZonesMap from "../../components/ZonesMap";
import "./index.styles.css";
import StaticCards from "../../components/StatisticCards";

const TopZones: FC = () => {
  return (
    <div className="topZonesPageContainer">
      <div className="mapBigContainer">
      <div className="mapTitle">Inclusive Zones Map with Accessibility Scores</div>
      <div className='mapBorder'>
        <div className="zoneMapsBigContainer">
          <ZonesMap />
        </div>
      </div>
      </div>
      <StaticCards />
    </div>
  );
};

export default TopZones;
