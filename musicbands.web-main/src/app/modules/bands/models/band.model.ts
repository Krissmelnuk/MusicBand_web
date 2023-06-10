import {BandStatus} from "../enums/bandStatus";
import {ImageModel} from "../../images/models/image.model";

export interface BandModel {
    id: string;
    name: string;
    url: string;
    image: ImageModel;
    status: BandStatus;
}
