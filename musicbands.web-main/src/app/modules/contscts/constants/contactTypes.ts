import {ContactType} from "../enums/contactType";

export const contactTypes = new Map()
    .set(ContactType.Phone, 'Phone')
    .set(ContactType.Email, 'Email')