import React from "react";
import "./index.styles.css";
import { LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const handleLogIn = () => {};

  const handleRegistration = () => {};

  const handleGoHome = () => {};

  return (
    <div className="headerContainer">
      <div onClick={() => handleGoHome()} className="headerTitle">
        <span className="normalLetter">T</span>
        <span className="whiteLetter">i</span>
        <span className="normalLetter">mAble</span>
      </div>
      {/* Render this when user is logged in */}
      <div className="logooutContianerLogOut">
        <div className="headerLogoContainer">
          {" "}
          <LogoutOutlined className="headerLogo" />
        </div>
        <div className="logoutText">Log Out</div>
      </div>
      {/* <div className="logooutContianer">
        <div className="logoutText">
          <div onClick={() => handleLogIn()}>Login</div>
          <div onClick={() => handleRegistration()} className="headerSeparator">
            |
          </div>
          <div> Register</div>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
