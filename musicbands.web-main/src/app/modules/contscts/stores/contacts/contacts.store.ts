import {Store, StoreConfig} from "@datorama/akita";
import {ContactModel} from "../../models/contact.model";

/**
 * Represents contacts state
 */
export interface ContactsState {
    contacts: ContactModel[];
}

/**
 * Creates initial state
 */
export function createInitialState (): ContactsState {
    return {
        contacts: []
    }
}

/**
 * Provides contacts states management
 */
@StoreConfig({ name: 'contacts', resettable: true })
export class ContactsStore extends Store<ContactsState> {
    constructor () {
        super(createInitialState())
    }

    public addContact(contact: ContactModel): void {
        const contacts = [...this.getValue().contacts, contact];
        this.update({contacts: contacts});
    }

    public updateContact(contact: ContactModel): void {
        const contacts = this.getValue().contacts.map(x => x.id === contact.id ? contact : x);
        this.update({contacts: contacts});
    }

    public deleteContact(id: string): void {
        const contacts = this.getValue().contacts.filter(x => x.id !== id);
        this.update({contacts: contacts});
    }
}

export const contactsStore = new ContactsStore()