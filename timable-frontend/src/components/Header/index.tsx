import { FC } from "react";
import "./index.styles.css";
import Icon, { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// import icon  from '../../../public/assets/logo.svg'

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
      <Icon component={() => <img  className= 'headerLogo' src="/assets/logo.svg"/>} />
      <Icon component={() => <img  className= 'headerLogoText' src="/assets/TimAble.svg"/>} />
      </div>
      {/* Render this when user is logged in */}
      <div className="logoutContainer">
        <div className="headerLogoContainer">
          {" "}
          <LogoutOutlined className="headerLogoOut" />
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
