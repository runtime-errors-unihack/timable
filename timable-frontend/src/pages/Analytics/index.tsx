import { FC } from "react";
import "./index.styles.css";
import DonutChart from "../../components/DonutChart";
import ColumChart from "../../components/ColumnChart";
import StaticCards from "../../components/StatisticCards";

const Analytics: FC = () => {
  return (
    <>
      <div className="chartContainers">
        <DonutChart />
        <ColumChart />
      </div>

      <StaticCards />
    </>
  );
};

export default Analytics;
