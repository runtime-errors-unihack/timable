import { UserModel } from "./user-model";
import { VoteModel } from "./vote-model";

interface DisabilityType {
    id: number;
    name: string;
}

export interface GetPinModel {
    id: number;
    description: string;
    status: string;
    disability_types: Array<DisabilityType>;
    is_anonymous: boolean;
    latitude: number;
    longitude: number;
    image_url: string;
    date_created: string;
    user: UserModel;
    votes: Array<VoteModel>;
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