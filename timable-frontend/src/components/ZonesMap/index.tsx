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
        "#005BDB",
        "#0068F9",
        "#0F72FC",
        "#1E7BFE",
        "#2C84FF",
        "#4291FF",
        "#68A7FF",
        "#84B7FF",
        "#9BC5FF",
        "#B2D2FF",
      ].reverse(),
      scale: {
        type: "quantile",
      },
    } as any,
    style: {
      stroke: "#1E7BFE",
      lineWidth: 1,
    },

    label: {
      visible: true,
      field: "Name",
      style: {
        fill: "#FFF",
        opacity: 1,
        fontSize: 11,
        fontWeight: "600",
        spacing: 1,
        stroke: "#00193D",
        strokeWidth: 0.8,
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
