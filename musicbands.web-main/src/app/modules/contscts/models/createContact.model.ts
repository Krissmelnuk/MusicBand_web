import {ContactType} from "../enums/contactType";

export interface CreateContactModel {
    bandId: string,
    name: string,
    description: string,
    value: string,
    isPublic: true,
    type: ContactType
}