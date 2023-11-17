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
      return "#DB3F3F";
    },
  };

  return (
    <div className="whiteBorder">
      <div className="donutContainer">
        <Pie {...config} className="donutChartComponent" />
      </div>
    </div>
  );
};
export default DonutChart;
