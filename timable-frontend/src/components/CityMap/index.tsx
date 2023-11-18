import Map, { MapLayerMouseEvent, ViewStateChangeEvent } from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import { FC, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { ViewPortModel } from "../../models/view-port-model";
import { PinModel } from "../../models/pin-model";
import { PlaceModel } from "../../models/place-model";
import { FlagFilled } from "@ant-design/icons";
// import Register from "./components/Register";
// import Login from "./components/Login";

const CityMap: FC = () => {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState<string | null>(
    myStorage.getItem("user")
  );
  const [pins, setPins] = useState<Array<PinModel>>([]);
  const [currentPlaceId, setCurrentPlaceId] = useState<number | null>(null);
  const [newPlace, setNewPlace] = useState<PlaceModel | null>();
  const [title, setTitle] = useState<string | null>();
  const [desc, setDesc] = useState<string | null>(null);
  const [star, setStar] = useState<number>(0);
  const [viewport, setViewport] = useState<ViewPortModel>({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const pin0 = {
    id: 0,
    latitude: 45.790696,
    longitude: 21.296788,
    status: "bad",
    imageURL: "url",
    type: "typeExample",
    description: "desc",
  };

  const pin1 = {
    id: 1,
    latitude: 45.760696,
    longitude: 21.226788,
    status: "bad",
    imageURL: "url",
    type: "typeExample",
    description: "desc",
  };

  const hardCodedPins: Array<PinModel> = [];
  hardCodedPins.push(pin0);
  hardCodedPins.push(pin1);

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
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace?.latitude,
      long: newPlace?.longitude,
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
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        {...viewport}
        style={{ height: "100%", width: '100%' }}
        // transitionDuration="200"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoidmxhZDI4IiwiYSI6ImNsMmc2bjRwYjAwemUzaHFlaXVjbWFwdnQifQ.C7A79U0VeB2UA-FEZF6eQg"
        {...viewport}
        onMove={(e: ViewStateChangeEvent) => setViewport(e.viewState)}
        onDblClick={handleAddClick}
      >
        {hardCodedPins.map((p) => (
          <>
            <Marker
              latitude={p.latitude}
              longitude={p.longitude}
              offset={[-3.5 * viewport.zoom, 7 * viewport.zoom]}
            >
              <FlagFilled
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: p.status === "bad" ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p.id, p.latitude, p.longitude)}
              />
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
                  {/* <label>Place</label>
                  <h4 className="place">{p.title}</h4> */}
                  <label>Description</label>
                  <p className="desc">{p.description}</p>
                  {/* <label>Rating</label> */}
                  {/* <div className="stars">
                    {Array(p.rating).fill(<AiFillStar className="star" />)}
                  </div> */}
                  {/* <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span> */}
                  {/* <span className="date">{timeago.format(p.createdAt)}</span> */}
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.latitude}
              longitude={newPlace.longitude}
              offset={[-3.5 * viewport.zoom, 7 * viewport.zoom]}
            >
              <FlagFilled
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
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
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(Number(e.target.value))}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
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
