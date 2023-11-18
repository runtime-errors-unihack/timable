import Map, { MapLayerMouseEvent, ViewStateChangeEvent } from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import { FC, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { ViewPortModel } from "../../models/view-port-model";
import { PinModel, SendPinModel } from "../../models/pin-model";
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
import { Select } from "antd";
// import Register from "./components/Register";
// import Login from "./components/Login";

const CityMap: FC = () => {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState<string | null>(
    myStorage.getItem("user")
  );
  const [viewport, setViewport] = useState<ViewPortModel>({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });
  const [pins, setPins] = useState<Array<PinModel>>([]);
  const [currentPlaceId, setCurrentPlaceId] = useState<number | null>(null);
  const [newPlace, setNewPlace] = useState<PlaceModel | null>(null);

  const [description, setDescription] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [isAnonym, setIsAnonym] = useState<boolean>(false);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPin: SendPinModel = {
      userId: Number(myStorage.getItem("userId")) ?? 0,
      description,
      status,
      type,
      isAnonym,
      latitude: newPlace?.latitude ?? 0,
      longitude: newPlace?.longitude ?? 0,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const getPins = async () => {
  //     try {
  //       const allPins = await axios.get("/pins");
  //       setPins(allPins.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getPins();
  // }, []);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
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
        {hardCodedPins.map((p) => (
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
                  <label>Place</label>
                  <h4 className="place">Trecere Pietoni</h4>
                  <label>Description</label>
                  <p className="desc">{p.description}</p>
                  <label>Votes</label>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>Vlad</b>
                  </span>
                  <span className="date">18.11.2023</span>
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
                  ></Select>

                  <label>Type</label>
                  <Select
                    options={[
                      { value: TypeEnum.VISUAL_IMPAIRMENT, label: "Visual Impairment" },
                      { value: TypeEnum.PHYSICAL_IMPAIRMENT, label: "Physical Impairment" },
                      { value: TypeEnum.AUDITORY_DISABILITIES, label: "Auditory Disability" },
                    ]}
                    onChange={(e) => setType(e.target.value)}
                    mode="multiple"
                  >
                  </Select>

                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
        {/* {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )} */}
        {/* {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )} */}
      </Map>
    </div>
  );
};

export default CityMap;
