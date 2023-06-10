import {ContactType} from "../enums/contactType";

export interface ContactModel {
    id: string;
    name: string;
    description: string;
    value: string;
    isPublic: boolean;
    type: ContactType;
}