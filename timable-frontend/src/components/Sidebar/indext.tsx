import React, { FC, useState } from "react";
import "./index.styles.css";
import SideBarButtons from "../SideBarButton";
import Icon from "@ant-design/icons";

interface SidebarProps{
  hideSideBar: boolean
}

const Sidebar : FC<SidebarProps> = ({hideSideBar}) => {
  return (
    <>
      <div  className={hideSideBar? "sidebarContainerHide": "sidebarContainer"}>
        <div className="siderBackground">
          <Icon className="goIconSidebar"
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
