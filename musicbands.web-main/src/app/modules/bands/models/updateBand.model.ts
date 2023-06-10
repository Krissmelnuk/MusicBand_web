import {BandStatus} from "../enums/bandStatus";

export interface UpdateBandModel {
    id: string;
    url: string;
    name: string;
    status: BandStatus;
}