import React from "react";
import "./index.styles.css";
import SideBarButtons from "../SideBarButton";

const StaticCards = () => {
  return (
    <div className="staticCardsBigContainer">
      <div className="staticCardsContainerFirst">
        <div className="staticCardsTile">City Average</div>
        <div className="staticCardsNumberAverage">3.2</div>
      </div>
      <div className="staticCardsContainer">
        <div className="staticCardsTile">Total Pins Added</div>
        <div className="staticCardsNumberTotal">322</div>
      </div>
      <div className="staticCardsContainer">
        <div className="staticCardsTile">Closed Issues</div>
        <div className="staticCardsNumberClosed">124</div>
      </div>
      <div className="staticCardZone">
        <div className="staticCardsTile">Top Zones</div>
        <div className="topList">
          <div className="zone">Complex Studentesc </div>
          <div className="zone">Iosefin</div>
          <div className="zone">Lipovei</div>
        </div>
      </div>
    </div>
  );
};

export default StaticCards;
