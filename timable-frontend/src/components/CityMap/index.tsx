import Map, { MapLayerMouseEvent, ViewStateChangeEvent } from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import { FC, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { ViewPortModel } from "../../models/view-port-model";
import { GetPinModel, SendPinModel } from "../../models/pin-model";
import { PlaceModel } from "../../models/place-model";
import {
  StatusEnum,
  TypeEnum,
  mapBoxAccessToken,
  mapStyle,
  pinIcon,
  pinStyle,
} from "../../utils/constants";
import "./index.styles.css";
import FileUpload from "../FileUpload";
import { hardCodedPins } from "../../utils/pinData";
import { Select, Switch } from "antd";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

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
  const [type, setType] = useState<string | null>(null);
  const [isAnonym, setIsAnonym] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>();

    useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("http://localhost:8000/pin");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  // const getUser = async (userId: number) => {
  //   const response = await axios.get('url');
  //   setUserName(response.data.name);
  // }

  const handleMarkerClick = (id: number, lat: number, long: number) => {
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

  const handleTypeOnChange = (selectedType: string) => {
    setType(selectedType);
  };

  const handleSwitchOnChange = (checked: boolean) => {
    setIsAnonym(checked);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPin: SendPinModel = {
      user_id: 1,
      description,
      status,
      disability_types: ['visual'],
      is_anonymous: isAnonym,
      latitude: newPlace?.latitude ?? 0,
      longitude: newPlace?.longitude ?? 0,
    };

    try {
      const res = await axios.post("http://localhost:8000/pin", newPin);
      console.log(res);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
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
        {pins.map((p) => (
          <>
            <Marker latitude={p.latitude} longitude={p.longitude}>
              <svg
                height={40}
                viewBox="0 0 24 24"
                style={pinStyle}
                onClick={() => handleMarkerClick(p.id, p.latitude, p.longitude)}
              >
                <path d={pinIcon} />
              </svg>
            </Marker>
            {p.id === currentPlaceId && (
              <Popup
                key={p.id}
                latitude={p.latitude}
                longitude={p.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Description</label>
                  <h4 className="description">{p.description}</h4>

                  <img
                    src={p.imageURL}
                    alt="Pin"
                    width="500"
                    height="600"
                  ></img>

                  <label>Status</label>
                  <p className="status">{p.status}</p>

                  <label>Type</label>
                  <p className="type">{p.type}</p>

                  <span className="username">
                    Created by <b>Vlad</b>
                  </span>

                  <span className="date">{p.date}</span>

                  <div className="votesContainer">
                    <LikeOutlined className="like" />
                    <DislikeOutlined className="unlike" />
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker latitude={newPlace.latitude} longitude={newPlace.longitude}>
              <svg height={40} viewBox="0 0 24 24" style={pinStyle}>
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

                  <label>Type</label>
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
                        value: TypeEnum.AUDITORY_DISABILITIES,
                        label: "Speech Disabilities",
                      },
                    ]}
                    onChange={handleTypeOnChange}
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
