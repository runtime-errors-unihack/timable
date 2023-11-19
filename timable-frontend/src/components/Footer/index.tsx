import React, { FC } from "react";
import "./index.styles.css";
import { CopyrightOutlined } from "@ant-design/icons";


interface FooterProps{
  hideSideBar: boolean
}
const Footer : FC<FooterProps> = ({hideSideBar}) => {
  return <div className="footerContainer">
    <div className={hideSideBar? "emptyFooterHide":"emptyFooter"}>f</div>
    <div className="footer"><CopyrightOutlined />
    2023 TimAble </div>
  </div>;
};

export default Footer;
