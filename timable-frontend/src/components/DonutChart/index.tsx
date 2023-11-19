import { FC } from "react";
import { Pie } from "@ant-design/plots";
import "./index.styles.css";

interface DonutChart {
  high: string;
  low: string;
}

const DonutChart: FC<DonutChart> = ({ high, low }) => {
  const data = [
    {
      type: "High Accessibility",
      value: Number(high),
    },
    {
      type: "Low Accessibility",
      value: Number(low),
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
