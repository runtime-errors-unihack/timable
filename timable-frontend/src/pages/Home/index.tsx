import { FC, useState } from "react";
import "./index.styles.css";
import CityMap from "../../components/CityMap";
import "./index.styles.css";
import { Button, Select } from "antd";
import { StatusEnum, TypeEnum } from "../../utils/constants";
import axios from "axios";
import { GetPinModel } from "../../models/pin-model";

const Home: FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [tag2, setTag2] = useState<string | null>(null);
  const [disabilityTypes, setDisabilityTypes] = useState<string | null>();
  const [minVotes, setMinVotes] = useState<number | null>(null);
  const [maxVotes, setMaxVotes] = useState<number | null>(null);
const [voteRange, setVoteRange] = useState<string | null >(null)
  const [timePeriod, setTimePeriod] = useState<number | null>(null);
  const [pins, setPins] = useState<Array<GetPinModel>>([]);

  const handleChangeDisability = (value: any) => {
    setDisabilityTypes(value);
  };
  const handleChangeRage = (value: any) => {
    // console.log(value)
    if(value === 10){
      setMaxVotes(10)
      setMinVotes(10)
      setVoteRange("0-10")
    }else if(value === 100) {
      setMaxVotes(100)
      setMinVotes(10)
      setVoteRange("10-100")
    } else {
      setMaxVotes(1000)
      setMinVotes(100)
      setVoteRange("100-1000")
    }
  };
  const handleChangeStatus = (value: any) => {
    setStatus(value);
  };

  const handleChangeTimePeriod = (value: any) => {
    setTimePeriod(value);
  };
  const handleChangeTag = (value: any) => {
    setTag2(value);
  };
  // console.log(tag)
  const handleApplyFilters = async () => {
    const allPins = await axios.get("http://localhost:8000/pin", {
      params: {
        disability_type: disabilityTypes,
        months_ago: timePeriod,
        min_Votes: minVotes,
        max_votes: maxVotes,
        status: status,
        tag: tag2,
      },
    });
    setPins(allPins.data);
  };

  const handleRemoveFilters = async () => {
    const allPins = await axios.get("http://localhost:8000/pin");
    setDisabilityTypes(null);
    setTimePeriod(null);
    setMaxVotes(null);
    setMinVotes(null);
    setTag2(null);
    setVoteRange(null)
    setStatus(null)
    setPins(allPins.data);
  };

  return (
    <div className="cityMapContainer">
      <div className="selectContainer">
        <Select
          className="selectHome"
          placeholder="Select Status"
          options={[
            { value: StatusEnum.GOOD, label: "Accessible Zone" },
            { value: StatusEnum.BAD, label: "In-Accessible Zone" },
            { value: StatusEnum.CLOSED, label: "Closed Issues" },
          ]}
          value={status}
          onChange={handleChangeStatus}
        ></Select>
        <Select
          className="selectHome"
          placeholder="Select Disability Type"
          onChange={handleChangeDisability}
          options={[
            {
              value: TypeEnum.VISUAL_IMPAIRMENT,
              label: "Visual Impairment",
            },
            {
              value: TypeEnum.PHYSICAL_IMPAIRMENT,
              label: "Physical Impairment",
            },
            {
              value: TypeEnum.AUDITORY_DISABILITIES,
              label: "Auditory Disabilities",
            },
            {
              value: TypeEnum.SPEECH_DISABILITIES,
              label: "Speech Disabilities",
            },
          ]}
          value={disabilityTypes}
        ></Select>
        <Select
          onChange={handleChangeTimePeriod}
          value={timePeriod}
          className="selectHome"
          placeholder="Select Time Period"
          options={[
            {
              value: 1,
              label: "<1 Month",
            },
            {
              value: 3,
              label: "<3 Months",
            },
            {
              value: 6,
              label: "1<6 Months",
            },
          ]}
        ></Select>
        <Select
          value={maxVotes}
          onChange={handleChangeRage}
          className="selectHome"
          placeholder="Select Votes Range"
          options={[
            {
              value: 10,
              label: "0-10",
            },
            {
              value: 100,
              label: "10-100",
            },
            {
              value: 1000,
              label: "100-1000",
            },
          ]}
        ></Select>
        <Select
          onChange={handleChangeTag}
          className="selectHome"
          placeholder="Select Tag"
          value={tag2}
          options={[
            {
              value: "parking",
              label: "Parking Lot",
            },
          ]}
        ></Select>
      </div>
      <div className="buttonsContainer">
      <Button type="primary" onClick={() => handleApplyFilters()}>
        Apply Filters
      </Button>
      <Button type="primary" onClick={() => handleRemoveFilters()} danger>
        Clear Filters
      </Button>
      </div>
      <CityMap updatedPins={pins} />
    </div>
  );
};

export default Home;
