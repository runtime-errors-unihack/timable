export interface GetPinModel {
    id: number;
    description: string;
    status: string;
    type: string;
    isAnonym: boolean;
    latitude: number;
    longitude: number;
    imageURL: string;
    date: string;
}

export interface SendPinModel {
    userId: number;
    description: string | null;
    status: string | null;
    type: string | null;
    isAnonym: boolean;
    latitude: number;
    longitude: number;
}