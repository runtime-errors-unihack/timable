import React, { useState } from "react";
import "./index.styles.css";
import { InfoCircleOutlined } from "@ant-design/icons";

const StaticCards = () => {
  return (
    <div className="staticCardsBigContainer">
      <div className="staticCardsContainerFirst">
        <div className="staticCardsTile">
          City Average
          <div className="tooltipIcon">
            <div className="tooltip-container">
              <InfoCircleOutlined />
              <div className="tooltipStatisticCards">
                Represents a comprehensive metric derived from the cumulative
                evaluation of accessibility across various zones. The score, is
                a weighted average that considers the ratio of accessible to
                less accessible places within each zone. It provides a summary
                of the city's overall accessibility, helping users make informed
                decisions for navigation within the urban landscape."
              </div>
            </div>
          </div>
        </div>
        <div className="staticCardsNumberAverage">3.2</div>
      </div>
      <div className="staticCardsContainer">
        <div className="staticCardsTile">
          Total Pins Added
          <div className="tooltipIcon">
            <div className="tooltip-container">
              <InfoCircleOutlined />
              <div className="tooltipStatisticCards">
                Represents the total number of pins added on the map, reflecting
                the collective efforts of users in contributing to our
                community. These user-generated pins serve as markers for both
                positive and negative accessibility experiences, allowing
                individuals to highlight places that excel or require
                improvement. The displayed count represents the overall
                accumulation of user contributions since the inception of the
                app.
              </div>
            </div>
          </div>
        </div>
        <div className="staticCardsNumberTotal">322</div>
      </div>
      <div className="staticCardsContainer">
        <div className="staticCardsTile">
          Closed Issues
          <div className="tooltipIcon">
            <div className="tooltip-container">
              <InfoCircleOutlined />
              <div className="tooltipStatisticCards">
                This card reveals the count of 'Closed Issues', signifying
                places with previously documented accessibility challenges that
                have now been successfully addressed. A 'Closed Issue' denotes
                the resolution of problems related to accessibility,
                transforming formerly non-friendly zones into areas designed
                with inclusivity in mind.
              </div>
            </div>
          </div>
        </div>
        <div className="staticCardsNumberClosed">124</div>
      </div>
      <div className="staticCardZone">
        <div className="staticCardsTileZone">
          Top Zones
          <div className="tooltipIcon">
            <div className="tooltip-container">
              <InfoCircleOutlined />
              <div className="tooltipStatisticCards">
                This card spotlights the top three zones within the city that
                have achieved the highest accessibility scores. Celebrate the
                dedication of these zones to creating an environment that caters
                to the needs of all individuals.
              </div>
            </div>
          </div>
        </div>
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
