import { FC } from "react";
import "./index.styles.css";
import ZonesMap from "../../components/ZonesMap";
import "./index.styles.css";
import StaticCards from "../../components/StatisticCards";

const TopZones: FC = () => {
  return (
    <div className='topZonesPageContainer'>
    <div className="zoneMapsBigContainer">
      <ZonesMap />
    </div>
      <StaticCards/>
      </div>
  );
};

export default TopZones;
