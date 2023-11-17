import React from "react";
import "./index.styles.css";
import {
  AreaChartOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  SketchOutlined,
} from "@ant-design/icons";

const handleGoAboutUs = () => {};
const handleGoAnalytics = () => {};
const handleGoHome = () => {};
const handleGoTopUsers = () => {};
const handleGoTopZones = () => {};
const handleGoSettings = () => {};

const SideBarButtons = () => {
  return (
    <>
      <div className="siderButtonContainer">
        <div className="firstSiderBarLink" onClick={() => handleGoHome()}>
          <div>
            <HomeOutlined className="sidebarIcon" />
          </div>
          <div> Home</div>
        </div>
      </div>
      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoTopUsers()}>
          <div>
            <SketchOutlined className="sidebarIcon" />
          </div>
          <div> Top Users</div>
        </div>
      </div>
      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoTopZones()}>
          <div>
            <SketchOutlined className="sidebarIcon" />
          </div>
          <div> Top Neighborhoods</div>
        </div>
      </div>
      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoAnalytics()}>
          <div>
            <AreaChartOutlined className="sidebarIcon" />
          </div>
          <div> Analytics</div>
        </div>
      </div>
      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoSettings()}>
          <div>
            <SettingOutlined className="sidebarIcon" />
          </div>
          <div> Settings</div>
        </div>
      </div>
      <div className="siderButtonContainer">
        <div className="siderBarLink" onClick={() => handleGoAboutUs()}>
          <div>
            <InfoCircleOutlined className="sidebarIcon" />
          </div>
          <div> About Us</div>
        </div>
      </div>
    </>
  );
};

export default SideBarButtons;
