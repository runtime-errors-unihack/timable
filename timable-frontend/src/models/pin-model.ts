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
    user_id: number;
    description: string | null;
    status: string | null;
    disability_types: Array<string | null>;
    is_anonymous: boolean;
    latitude: number;
    longitude: number;
}