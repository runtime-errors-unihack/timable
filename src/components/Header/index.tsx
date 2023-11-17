import React from "react";
import "./index.styles.css";
import { LogoutOutlined } from "@ant-design/icons";


const Header = () => {
  return (
    <div className="headerContainer">
      <div className="headerTitle">
        <span className="normalLetter">T</span>
        <span className="whiteLetter">i</span>
        <span className="normalLetter">mAble</span>
      </div>

      <div className="logooutContianer">
        <div className='headerLogoContainer'> <LogoutOutlined className="headerLogo" /></div>
        <div className="logoutText">Log Out</div>
      </div>
    </div>
  );
};

export default Header;
