import {ImageType} from "../enums/image.type";

export interface ImageModel {
    id: string;
    key: string;
    type: ImageType;
}