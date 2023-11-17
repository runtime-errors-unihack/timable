import React, { FC } from "react";
import "./index.styles.css";
import DonutChart from "../DonutChart";

const Content: FC = () => {
  return (
    <div className="contentContainer">
      <DonutChart />
    </div>
  );
};

export default Content;
