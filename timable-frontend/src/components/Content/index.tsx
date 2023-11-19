import { FC, ReactNode } from "react";
import "./index.styles.css";

interface ContentProps {
  children: ReactNode;
  hideSideBar: boolean
}

const Content: FC<ContentProps> = ({ children, hideSideBar }) => {
  return <div id="content-container" className={hideSideBar? "contentContainerFull"  : "contentContainer"}>{children}</div>;
};

export default Content;
