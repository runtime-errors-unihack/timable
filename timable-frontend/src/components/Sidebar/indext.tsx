import React from "react";
import "./index.styles.css";
import SideBarButtons from "../SideBarButton";

const Sidebar = () => {
  return (
    <div className="sidebarContainer">
      <div className="siderBackground">
        <SideBarButtons />
      </div>
    </div>
  );
};

export default Sidebar;
