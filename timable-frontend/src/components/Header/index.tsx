import { FC } from "react";
import "./index.styles.css";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  
  const handleLogIn = () => {};

  const handleRegistration = () => {};

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="headerContainer">
      <div onClick={() => handleGoHome()} className="headerTitle">
        <span className="normalLetter">T</span>
        <span className="whiteLetter">i</span>
        <span className="normalLetter">mAble</span>
      </div>
      {/* Render this when user is logged in */}
      <div className="logoutContainer">
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