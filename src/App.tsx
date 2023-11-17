import { FC } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/indext";

import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";

const App: FC = () => {

  <Routes>
  <Route path="/" element={<Home />}>
    <Route index element={<Home />} />
    <Route path="about" element={<AboutUs />} />
  </Route>
</Routes>

  return (
    <>
      <Header />
      <div className="layoutContainer">
        <Content />
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}

export default App;
