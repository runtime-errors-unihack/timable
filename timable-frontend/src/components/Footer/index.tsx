import React, { FC } from "react";
import "./index.styles.css";
import { CopyrightOutlined } from "@ant-design/icons";

const Footer: FC = ({}) => {
  return (
    <div className="footerContainer">
      <div className={"emptyFooter"}>f</div>
      <div className="footer">
        <CopyrightOutlined />
        2023 TimAble{" "}
      </div>
    </div>
  );
};

export default Footer;
