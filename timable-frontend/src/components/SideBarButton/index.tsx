import { FC } from "react";
import "./index.styles.css";
import {
  AreaChartOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface SideBarButtonsProps {
  hideText?: boolean;
}

const SideBarButtons: FC<SideBarButtonsProps> = ({ hideText }) => {
  const navigate = useNavigate();

  const handleGoAboutUs = () => {
    navigate("/about-us");
  };

  const handleGoAnalytics = () => {
    navigate("/analytics");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoTopUsers = () => {
    navigate("/top-users");
  };

  const handleGoTopZones = () => {
    navigate("/top-zones");
  };

  const handleGoSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="sidebarButtonsBigContainer">
      <div className="siderButtonContainer">
        <div className="firstSiderBarLink" onClick={() => handleGoHome()}>
          <div>
            <HomeOutlined className="sidebarIcon" />
          </div>
          {!hideText && <div> Home</div>}
        </div>
      </div>

      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoTopUsers()}>
          <div>
            <SketchOutlined className="sidebarIcon" />
          </div>
          {!hideText && <div> Top Users</div>}
        </div>
      </div>

      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoTopZones()}>
          <div>
            <SketchOutlined className="sidebarIcon" />
          </div>
          {!hideText && <div> Top Zones</div>}
        </div>
      </div>

      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoAnalytics()}>
          <div>
            <AreaChartOutlined className="sidebarIcon" />
          </div>
          {!hideText && <div> Analytics</div>}
        </div>
      </div>

      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoSettings()}>
          <div>
            <SettingOutlined className="sidebarIcon" />
          </div>
          {!hideText && <div> Settings</div>}
        </div>
      </div>

      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoAboutUs()}>
          <div>
            <InfoCircleOutlined className="sidebarIcon" />
          </div>
          {!hideText && <div> About Us</div>}
        </div>
      </div>
    </div>
  );
};

export default SideBarButtons;
