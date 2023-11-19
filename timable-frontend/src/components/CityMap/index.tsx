import Map, { MapLayerMouseEvent, ViewStateChangeEvent } from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import { FC, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { ViewPortModel } from "../../models/view-port-model";
import { GetPinModel, SendPinModel } from "../../models/pin-model";
import { PlaceModel } from "../../models/place-model";
import {
  StatusEnum,
  TagEnum,
  TypeEnum,
  badPinStyle,
  goodPinStyle,
  initialPinStyle,
  mapBoxAccessToken,
  mapStyle,
  pinIcon,
} from "../../utils/constants";
import "./index.styles.css";
import FileUpload from "../FileUpload";
import { Select, Switch } from "antd";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { VoteModel } from "../../models/vote-model";

const CityMap: FC = () => {
  const [viewport, setViewport] = useState<ViewPortModel>({
    latitude: 45.760696,
    longitude: 21.226788,
    zoom: 13,
  });
  const [pins, setPins] = useState<Array<GetPinModel>>([]);
  const [currentPlaceId, setCurrentPlaceId] = useState<number | null>(null);
  const [newPlace, setNewPlace] = useState<PlaceModel | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [disabilityTypes, setDisabilityTypes] = useState<Array<string>>([]);
  const [isAnonym, setIsAnonym] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [upVotes, setUpVotes] = useState<number>();
  const [downVotes, setDownVotes] = useState<number>();
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [votedPositive, setVotedPositive] = useState<boolean>(false);
  const [votedNegative, setVotedNegative] = useState<boolean>(false);

  useEffect(() => {
    const getPins = async () => {
      const allPins = await axios.get("http://localhost:8000/pin");
      setPins(allPins.data);
    };
    const getUserDetails = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const user = await axios.get("http://localhost:8000/session", {
          params: { session: token },
        });
        setUserId(user.data.id);
      }
    };
    getUserDetails();
    getPins();
  }, []);

  const handleMarkerClick = (
    id: number,
    lat: number,
    long: number,
    votes: Array<VoteModel>
  ) => {
    setUpVotes(votes?.filter((vote) => vote.state === "positive").length);
    setDownVotes(votes?.filter((vote) => vote.state === "negative").length);
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e: MapLayerMouseEvent) => {
    setNewPlace({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
  };

  const handleStatusOnChange = (selectedStatus: string) => {
    setStatus(selectedStatus);
  };

  const handleTagSelection = (value: string) => {
    setTag(value);
  };

  const handleDisabilityTypesOnChange = (selectedType: Array<string>) => {
    setDisabilityTypes(selectedType);
  };

  const handleSwitchOnChange = (checked: boolean) => {
    setIsAnonym(checked);
  };

  const uploadFile = async () => {
    if (file) {
      const fileInFormData = new FormData();
      fileInFormData.append("file", file);
      const fileURL = await axios.post(
        "http://localhost:8000/images",
        fileInFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: { resource_location: "pin_pics" },
        }
      );
      return fileURL.data.filename;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileURL = await uploadFile();
    const newPin: SendPinModel = {
      user_id: userId ?? 1,
      description,
      status,
      disability_types: disabilityTypes,
      is_anonymous: isAnonym,
      latitude: newPlace?.latitude ?? 0,
      longitude: newPlace?.longitude ?? 0,
      tag: tag,
    };

    const pin = await axios.post("http://localhost:8000/pin", newPin);
    const pinWithFile = await axios.patch(
      `http://localhost:8000/pin/${pin.data.id}?path_to_file=${fileURL}`
    );
    setPins([...pins, pinWithFile.data]);
    setNewPlace(null);
  };

  const addPinColorBasedOnStatus = (status: string) => {
    if (status === "good") {
      return goodPinStyle;
    }
    if (status === "bad") {
      return badPinStyle;
    }
    return initialPinStyle;
  };

  return (
    <div className="mapContainer">
      <Map
        {...viewport}
        style={{ height: "100%", width: "90%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={mapBoxAccessToken}
        onMove={(e: ViewStateChangeEvent) => setViewport(e.viewState)}
        onDblClick={handleAddClick}
      >
        {pins.map((pin) => {
          return (
            <div key={pin.id}>
              <Marker latitude={pin.latitude} longitude={pin.longitude}>
                <svg
                  height={40}
                  viewBox="0 0 24 24"
                  style={addPinColorBasedOnStatus(pin.status)}
                  onClick={() =>
                    handleMarkerClick(
                      pin.id,
                      pin.latitude,
                      pin.longitude,
                      pin.votes
                    )
                  }
                >
                  <path d={pinIcon} />
                </svg>
              </Marker>
              {pin.id === currentPlaceId && (
                <Popup
                  key={pin.id}
                  latitude={pin.latitude}
                  longitude={pin.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className="card">
                    <label>Pin Description</label>
                    <h4 className="description">{pin.description}</h4>

                    {pin?.image_url !== undefined &&
                      pin?.image_url !== null && (
                        <a
                          href={`http://localhost:8000${pin.image_url}`}
                          target="_blank"
                        >
                          <img
                            src={`http://localhost:8000${pin.image_url}`}
                            alt="Pin"
                            width="150"
                            height="100"
                          ></img>
                        </a>
                      )}

                    <label>Pin Status</label>
                    <p className="status">
                      {pin.status === "good"
                        ? "Accessible Zone"
                        : pin.status === "bad"
                        ? "In-Accessible Zone"
                        : "Closed Issue"}
                    </p>
                    {pin.tag !== null && (
                      <>
                        <label>Tag</label> <div>{pin?.tag}</div>
                      </>
                    )}

                    <label>
                      {pin?.disability_types.length > 1
                        ? "Disability Type"
                        : " Disability Types"}
                    </label>
                    {pin?.disability_types?.map((type) => {
                      return (
                        <div key={type.id} className="type">
                          {type.name.toUpperCase() +
                            `${
                              type.name === "visual" || type.name === "physical"
                                ? " IMPAIRMENT"
                                : " DISABILITIES"
                            }`}
                        </div>
                      );
                    })}

                    {!pin.is_anonymous && (
                      <>
                        <label>Created by</label>
                        <div>{pin?.user?.username}</div>
                      </>
                    )}
                    <label>Date</label>
                    <p>
                      <div>{pin.date_created.split("T")[0]}</div>
                    </p>

                    <div className="votesContainer">
                      <p className="votesNumber">{upVotes}</p>
                      <LikeOutlined
                        onClick={() => {
                          if (votedPositive) return;
                          setVotedNegative(false);
                          setVotedPositive(true);
                          setUpVotes((prevUpVotes) =>
                            prevUpVotes !== undefined ? prevUpVotes + 1 : 0
                          );
                          setHasVoted(true);
                          if (hasVoted) {
                            setDownVotes((prevDownVotes) =>
                              prevDownVotes !== undefined
                                ? prevDownVotes - 1
                                : 0
                            );
                          }
                        }}
                        className="like"
                      />

                      <p className="votesNumber">{downVotes}</p>
                      <DislikeOutlined
                        onClick={() => {
                          if (votedNegative) return;
                          setVotedNegative(true);
                          setVotedPositive(false);
                          setDownVotes((prevDownVotes) =>
                            prevDownVotes !== undefined ? prevDownVotes + 1 : 0
                          );
                          setHasVoted(true);
                          if (hasVoted) {
                            setUpVotes((prevUpVotes) =>
                              prevUpVotes !== undefined ? prevUpVotes - 1 : 0
                            );
                          }
                        }}
                        className="unlike"
                      />
                    </div>
                  </div>
                </Popup>
              )}
            </div>
          );
        })}
        {newPlace && (
          <>
            <Marker latitude={newPlace.latitude} longitude={newPlace.longitude}>
              <svg height={40} viewBox="0 0 24 24" style={initialPinStyle}>
                <path d={pinIcon} />
              </svg>
            </Marker>
            <Popup
              latitude={newPlace.latitude}
              longitude={newPlace.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Description</label>
                  <textarea
                    maxLength={500}
                    className="pinDescriptionTextArea"
                    placeholder="Describe the problem."
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <label>Upload a file</label>
                  <FileUpload file={file} setFile={setFile} />

                  <label>Status</label>
                  <Select
                    options={[
                      { value: StatusEnum.GOOD, label: "Accessible Zone" },
                      { value: StatusEnum.BAD, label: "In-Accessible Zone" },
                    ]}
                    onChange={handleStatusOnChange}
                  ></Select>

                  <label>Tag</label>
                  <Select
                    options={[
                      {
                        value: TagEnum.PARKING_LOT,
                        label: "Parking Lot",
                      },
                    ]}
                    onChange={handleTagSelection}
                  ></Select>

                  <label>Types</label>
                  <Select
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
                    onChange={handleDisabilityTypesOnChange}
                    mode="multiple"
                  ></Select>

                  <label>Post Anonymously</label>
                  <Switch className="switch" onChange={handleSwitchOnChange} />

                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
      </Map>
    </div>
  );
};

export default CityMap;
