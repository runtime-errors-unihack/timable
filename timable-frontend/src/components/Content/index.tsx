import { FC, ReactNode } from "react";
import "./index.styles.css";

interface ContentProps {
  children: ReactNode
}

const Content: FC<ContentProps> = ({ children }) => {
  return <div id="content-container" className={ "contentContainer"}>{children}</div>;
};

export default Content;
