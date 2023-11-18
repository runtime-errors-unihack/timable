import { Column } from "@ant-design/plots";
import { FC } from "react";
import './index.styles.css'

const ColumChart: FC = () => {
  const data = [
    {
      name: "Total issues",
      month: "Jan.",
      pins: 100,
    },
    {
      name: "Active issues",
      month: "Jan.",
      pins: 30,
    },
    {
      name: "Closed issues",
      month: "Jan.",
      pins: 70,
    },
    {
      name: "Total issues",
      month: "Feb.",
      pins: 130,
    },
    {
      name: "Active issues",
      month: "Feb.",
      pins: 20,
    },
    {
      name: "Closed issues",
      month: "Feb.",
      pins: 110,
    },
    {
      name: "Total issues",
      month: "Mar.",
      pins: 90,
    },
    {
      name: "Active issues",
      month: "Mar.",
      pins: 80,
    },
    {
      name: "Closed issues",
      month: "Mar.",
      pins: 10,
    },
    {
      name: "Total issues",
      month: "Apr.",
      pins: 80,
    },
    {
      name: "Active issues",
      month: "Apr.",
      pins: 80,
    },
    {
      name: "Closed issues",
      month: "Apr.",
      pins: 0,
    },
    {
      name: "Total issues",
      month: "May",
      pins: 90,
    },
    {
      name: "Active issues",
      month: "May",
      pins: 10,
    },
    {
      name: "Closed issues",
      month: "May",
      pins: 80,
    },
    {
      name: "Total issues",
      month: "Jun.",
      pins: 20,
    },
    {
      name: "Active issues",
      month: "Jun.",
      pins: 0,
    },
    {
      name: "Closed issues",
      month: "Jun.",
      pins: 20,
    },
    {
      name: "Total issues",
      month: "Jul.",
      pins: 130,
    },
    {
      name: "Active issues",
      month: "Jul.",
      pins: 120,
    },
    {
      name: "Closed issues",
      month: "Jul.",
      pins: 10,
    },
    {
      name: "Total issues",
      month: "Aug.",
      pins: 120,
    },
    {
      name: "Active issues",
      month: "Aug.",
      pins: 0,
    },
    {
      name: "Closed issues",
      month: "Aug.",
      pins: 120,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: "month",
    yField: "pins",
    seriesField: "name",

    color: ["#1677ff", "#ff4d4f", "#0F9C72"],

    label: {
      position: "top" as any,

      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return (
    <>
   
    <div className="whiteBorder">
      <div className="columnChart">
        <Column {...config} />
      </div>
    </div>
    </>
  );
};

export default ColumChart;
