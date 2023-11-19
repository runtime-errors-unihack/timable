import { FC } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/indext";

import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import TopUsers from "./pages/TopUsers";
import TopZones from "./pages/TopZones";
import Analytics from "./pages/Analytics";
import Content from "./components/Content";

const App: FC = () => {
  const currentUrl = window.location.href;
  const hideSideBar =
    currentUrl === "http://localhost:3000/login" ||
    currentUrl === "http://localhost:3000/register"
      ? true
      : false;

  return (
    <>
      <Header  />
      <div className="layoutContainer">
        <Sidebar hideSideBar={hideSideBar} />
        <Content hideSideBar={hideSideBar}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="top-users" element={<TopUsers />} />
            <Route path="top-zones" element={<TopZones />} />
          </Routes>
        </Content>
      </div>
      <Footer hideSideBar={hideSideBar} />
    </>
  );
};

export default App;
