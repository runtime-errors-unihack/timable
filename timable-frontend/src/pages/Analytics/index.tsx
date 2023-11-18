import { FC } from "react";
import "./index.styles.css";
import DonutChart from "../../components/DonutChart";
import ColumChart from "../../components/ColumnChart";
import StaticCards from "../../components/StatisticCards";
import TypeChart from "../../components/TypeChart";
import { Button } from "antd";

const Analytics: FC = () => {

  const generatePdf =() => {

  }
  return (
    <>
      <div className="chartContainers">
        <DonutChart />
        <ColumChart />
      </div>

      <TypeChart/>
      <div className='buttonPdfContainer'>
      <StaticCards />
      <Button type="primary" className="pdfButton" onClick = {() => generatePdf()}>Generate PDF</Button>
      </div>
    </>
  );
};

export default Analytics;
