import React, { FC } from "react";
import "./index.styles.css";
import DonutChart from "../DonutChart";
import ColumChart from "../ColumnChart";

const Content: FC = () => {
  return (
    <div className="contentContainer">
      <ColumChart />
    </div>
  );
};

export default Content;
