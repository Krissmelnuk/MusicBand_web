import {LinkType} from "../enums/linkType";

export interface CreateLinkModel {
    bandId: string,
    name: string,
    description: string,
    value: string,
    isPublic: true,
    type: LinkType
}