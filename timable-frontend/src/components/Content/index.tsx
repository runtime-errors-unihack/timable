import { FC, ReactNode } from "react";
import "./index.styles.css";
import ColumChart from "../ColumnChart";

interface ContentProps {
  children: ReactNode;
}

const Content: FC<ContentProps> = ({children}) => {
  return (
    <div className="contentContainer">
      {children}
    </div>
  );
};

export default Content;
