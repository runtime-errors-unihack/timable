export const mapStyle = "mapbox://styles/mapbox/streets-v9";

export const mapBoxAccessToken =
  "pk.eyJ1IjoidmxhZDI4IiwiYSI6ImNsMmc2bjRwYjAwemUzaHFlaXVjbWFwdnQifQ.C7A79U0VeB2UA-FEZF6eQg";

export const pinIcon = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`;

export const badPinStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none",
};

export const goodPinStyle = {
  cursor: "pointer",
  fill: "#1c87c9",
  stroke: "none",
};

export const initialPinStyle = {
  cursor: "pointer",
  fill: "#808080",
  stroke: "none",
};

export enum StatusEnum  {
  GOOD = 'good',
  BAD = 'bad',
  CLOSED = 'closed'
}

export enum TypeEnum  {
  VISUAL_IMPAIRMENT = 'visual',
  PHYSICAL_IMPAIRMENT = 'physical',
  AUDITORY_DISABILITIES = 'auditory',
  SPEECH_DISABILITIES = 'speech',
}
