import {ContentType} from "../enums/contentType";

export interface ContentModel {
    id: string;
    data: string;
    locale: string;
    type: ContentType;
}