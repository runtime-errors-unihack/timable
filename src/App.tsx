import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/indext";

import "./index.css";

function App() {
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
