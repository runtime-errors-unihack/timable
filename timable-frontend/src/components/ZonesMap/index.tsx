import React, { useState, useEffect, FC } from "react";
import ReactDOM from "react-dom";
import { AreaMap } from "@ant-design/maps";

import "./index.styles.css";
import { zoneMapData } from "../../utils/zoneMapData";

const ZonesMap: FC = () => {
  const data = zoneMapData;

  const config = {
    map: {
      type: "mapbox" as any,
      style: "blank",
      center: [45.7489, 21.2087] as any,
      zoom: 1,
      pitch: 0,
    },
    source: {
      data: data,
      parser: {
        type: "geojson" as any,
      },
    },
    autoFit: true,
    color: {
      field: "Accessibility Score",
      value: [
        "#004656",
        "#04687E",
        "#258DA4",
        "#369FB7",
        "#46B1C9",
        "#74737B",
        "#8B5454",
        "#A2352D",
        "#7D1B17",
        "#570000",
      ].reverse(),
      scale: {
        type: "quantile",
      },
    } as any,
    style: {
      opacity: 1,
      stroke: "#fff",
      lineWidth: 0.8,
      lineOpacity: 1,
    },

    label: {
      visible: true,
      field: "Name",
      style: {
        fill: "#FFF",
        opacity: 1,
        fontSize: 10,
        fontWeight: '600',
        spacing: 1,
        stroke: "#000",
        strokeWidth: 0.8,
        textAllowOverlap: true,
      },
    },
    tooltip: {
      items: ["Name", "Accessibility Score"],
    },
    zoom: {
      position: "bottomright" as any,
    },
    legend: {
      position: "bottomleft" as any,
    },
  };

  return <AreaMap {...config} />;
};

export default ZonesMap;
