import { FC } from "react";
import "./index.styles.css";
import Icon, { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const isUserLogged = sessionStorage.getItem("token");
  const isOnLogin = currentUrl === "http://localhost:3000/login";
  const isOnRegister = currentUrl === "http://localhost:3000/register";

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handleRegistration = () => {
    navigate("/register");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="headerContainer">
      <div onClick={() => handleGoHome()} className="headerTitle">
        <Icon
          component={() => (
            <img className="headerLogo" src="/assets/logo.svg" />
          )}
        />
        <Icon
          component={() => (
            <img className="headerLogoText" src="/assets/TimAble.svg" />
          )}
        />
      </div>
      {isUserLogged !== null ? (
        <div className="logoutContainer">
          <div className="headerLogoContainer">
            <LogoutOutlined className="headerLogoOut" />
          </div>
          <div className="logoutText" onClick={() => handleLogout()}>
            Log Out
          </div>
        </div>
      ) : (
        <div className="registerLoginContainer">
          <div className="logoutText">
            {isOnRegister && <div onClick={() => handleLogIn()}>Login</div>}
            {!(isOnLogin || isOnRegister) && (
              <div className="headerSeparator">|</div>
            )}

            {isOnLogin && (
              <div onClick={() => handleRegistration()}> Register</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
