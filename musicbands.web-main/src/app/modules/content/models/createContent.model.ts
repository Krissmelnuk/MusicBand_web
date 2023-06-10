import {ContentType} from "../enums/contentType";

export interface CreateContentModel {
    bandId: string;
    data: string;
    locale: string;
    type: ContentType;
}