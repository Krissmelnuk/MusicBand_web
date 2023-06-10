import {ContentType} from "../enums/contentType";

export const contentTypeNames = new Map<ContentType, string>()
    .set(ContentType.bio, 'bio')
    .set(ContentType.history, 'history');