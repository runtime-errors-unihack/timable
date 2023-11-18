export interface PinModel {
    id: number;
    latitude: number;
    longitude: number;
    status: string;
    imageURL: string;
    type: string;
    description: string;
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