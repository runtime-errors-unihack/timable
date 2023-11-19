import { FC } from "react";
import "./index.styles.css";
import { InfoCircleOutlined } from "@ant-design/icons";

interface StaticCards {
  cityAverage: number;
  totalPins: number;
  closedPins: number;
  topZones: [string, unknown][];
}

const StaticCards: FC<StaticCards> = ({
  cityAverage,
  totalPins,
  closedPins,
  topZones,
}) => {

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
        <div className="staticCardsNumberAverage">
          {(cityAverage * 100).toFixed(2)}
        </div>
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
        <div className="staticCardsNumberTotal">{totalPins}</div>
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
        <div className="staticCardsNumberClosed">{closedPins}</div>
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
          {topZones.length && (
            <>
              <div className="zone">{topZones[0][0] ?? ""}</div>
              <div className="zone">{topZones[1][0] ?? ""}</div>
              <div className="zone">{topZones[2][0] ?? ""}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaticCards;
