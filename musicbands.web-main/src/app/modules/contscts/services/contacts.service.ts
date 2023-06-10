import {Observable} from "rxjs";
import Axios from "axios-observable";
import {API_URL} from "../../../../env";
import {contactsStore, ContactsStore} from "../stores/contacts";
import {ContactModel} from "../models/contact.model";
import {authHeader} from "../../_common/helpers/authHeader";
import {CreateContactModel} from "../models/createContact.model";
import {UpdateContactModel} from "../models/updateContact.model";

export class ContactsService {

    constructor(private store: ContactsStore) {}

    public get(bandId: string): Observable<ContactModel[]> {
        return new Observable(observer => {
            Axios.get<ContactModel[]>(`${API_URL}Contacts?bandId=${bandId}`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({contacts: response.data});
                        observer.next();
                        observer.complete();
                    },
                    error: error => {
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public create(model: CreateContactModel): Observable<ContactModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.post<ContactModel>(`${API_URL}Contacts`, model, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.addContact(response.data);
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: error => {
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public update(model: UpdateContactModel): Observable<ContactModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.put<ContactModel>(`${API_URL}Contacts`, model, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.updateContact(response.data);
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: error => {
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public delete(id: string): Observable<ContactModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.delete<ContactModel>(`${API_URL}Contacts/${id}`, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.deleteContact(id);
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: error => {
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }
}

export const contactsService = new ContactsService(contactsStore)
