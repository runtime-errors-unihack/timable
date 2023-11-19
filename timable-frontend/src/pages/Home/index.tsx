import { FC } from "react";
import "./index.styles.css";
import CityMap from "../../components/CityMap";
import "./index.styles.css";
import { Select } from "antd";

const Home: FC = () => {
  return (
    <div className="cityMapContainer">
      <div className="selectContainer">
        <Select className="selectHome" placeholder="Select Status"></Select>
        <Select
          className="selectHome"
          placeholder="Select Disability Type"
        ></Select>
        <Select
          className="selectHome"
          placeholder="Select Time Period"
        ></Select>
        <Select
          className="selectHome"
          placeholder="Select Votes Range"
        ></Select>
      </div>
      <CityMap />
    </div>
  );
};

export default Home;
