import { GetPinModel } from "../models/pin-model";

export const hardCodedPins: Array<GetPinModel> = [
  {
    id: 0,
    description: "desc",
    status: "bad",
    type: "typeExample",
    isAnonym: false,
    latitude: 45.790696,
    longitude: 21.296788,
    imageURL: "url",
    date: new Date().toLocaleString(),
  },
  {
    id: 1,
    description: "desc",
    status: "bad",
    type: "typeExample",
    isAnonym: false,
    latitude: 45.760696,
    longitude: 21.226788,
    imageURL: "url",
    date: new Date().toLocaleString(),
  },
];
