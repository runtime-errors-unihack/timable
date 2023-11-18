import React, { useState } from "react";
import "./index.styles.css";
import SideBarButtons from "../SideBarButton";
import Icon from "@ant-design/icons";

const Sidebar = () => {
  return (
    <>
      <div className="sidebarContainer">
        <div className="siderBackground">
          <Icon
            component={() => (
              <img className="headerLogoInSidebar" src="/assets/logo.svg" />
            )}
          />
          <SideBarButtons />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
