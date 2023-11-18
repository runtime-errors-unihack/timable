import React, { useState, useEffect, FC } from "react";
import { Pie } from "@ant-design/plots";
import ReactDOM from "react-dom";
import "./index.styles.css";

const DonutChart: FC = () => {
  const data = [
    {
      type: "High Accessibility",
      value: 130,
    },
    {
      type: "Low Accessibility",
      value: 90,
    },
  ];

  const config = {
    appendPadding: 0,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "outer",
      content: "{percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],

    color: ({ type }: any) => {
      if (type !== "Low Accessibility") {
        return "#0F9C72";
      }
      return "#ff4d4f";
    },
  };

  return (
    <>
      <div className="donutChartTitle">
        City Accessibility Distribution: Proportion of Zones with Good and Poor
        Accessibility{" "}
      </div>

      <div className="whiteBorderDonut">
        <div className="donutContainer">
          <Pie {...config} className="donutChartComponent" />
        </div>
      </div>
    </>
  );
};
export default DonutChart;
