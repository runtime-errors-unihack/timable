import { FC } from "react";
import "./index.styles.css";
import DonutChart from "../../components/DonutChart";
import ColumChart from "../../components/ColumnChart";
import StaticCards from "../../components/StatisticCards";
import TypeChart from "../../components/TypeChart";

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
      <div className="pdfButton" onClick = {() => generatePdf()}>Generate PDF</div>
      </div>
    </>
  );
};

export default Analytics;
