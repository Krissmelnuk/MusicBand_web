import {LinkType} from "../enums/linkType";

export interface LinkModel {
    id: string;
    name: string;
    description: string;
    value: string;
    isPublic: boolean;
    type: LinkType;
}