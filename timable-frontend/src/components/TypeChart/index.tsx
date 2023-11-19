import React, { useState, useEffect, FC } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import { ColumnConfig } from "@ant-design/plots";
import "./index.styles.css";
import { GetPinModel } from "../../models/pin-model";
import { TypeEnum } from "../../utils/constants";

interface TypeChartProps {
  pins: GetPinModel[];
}

const TypeChart: FC<TypeChartProps> = ({ pins }) => {
  const data = [
    {
      type: "Visual Impairment",
      value: pins.filter(
        (pin) => pin.disability_types[0].name === TypeEnum.VISUAL_IMPAIRMENT
      ).length,
    },
    {
      type: "Physical Impairment",
      value: pins.filter(
        (pin) => pin.disability_types[0].name === TypeEnum.PHYSICAL_IMPAIRMENT
      ).length,
    },
    {
      type: "Speech Disabilities",
      value: pins.filter(
        (pin) => pin.disability_types[0].name === TypeEnum.SPEECH_DISABILITIES
      ).length,
    },
    {
      type: "Auditory Disabilities",
      value: pins.filter(
        (pin) => pin.disability_types[0].name === TypeEnum.AUDITORY_DISABILITIES
      ).length,
    },
  ] as any;
  const paletteSemanticRed = "#F4664A";
  const brandColor = "#5B8FF9";
  const config = {
    data,
    xField: "type" as any,
    yField: "value" as any,
    seriesField: "" as any,
    color: ({ type }: any) => {
      if (type === "Speech Disabilities") {
        return "#dd4949" as any;
      } else if (type === "Auditory Disabilities") {
        return "#2d74ad" as any;
      } else if (type === "Visual Impairment") {
        return "#ffda55" as any;
      }

      return "#1ba179" as any;
    },
    label: {
      content: (originData: any) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
        return undefined;
      },
      offset: 10 as any,
    },
    legend: false as boolean,
    xAxis: {
      label: {
        autoHide: true as boolean,
        autoRotate: false as boolean,
      },
    },
  } as ColumnConfig;
  return (
    <div className="typeChartBigContainer">
      <div className="columnChartTitle">
        Disability-Related Issues: Breakdown by Category
      </div>
      <div className="typeChartContainer">
        <Column {...config} />
      </div>
    </div>
  );
};

export default TypeChart;
