import { FC, ReactNode } from "react";
import "./index.styles.css";
import ColumChart from "../ColumnChart";
import StaticCards from "../StatisticCards";

interface ContentProps {
  children: ReactNode;
}

const Content: FC<ContentProps> = ({children}) => {
  return (
    <div className="contentContainer">
 
    </div>
  );
};

export default Content;
