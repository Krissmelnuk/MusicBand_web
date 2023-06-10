import { Query } from '@datorama/akita'
import {ContactsState, contactsStore, ContactsStore} from "./contacts.store";

/**
 * Provides contacts queries
 */
export class ContactsQuery extends Query<ContactsState> {
    $contacts = this.select(state => state.contacts);

    constructor (protected store: ContactsStore) {
        super(store)
    }
}

export const contactsQuery = new ContactsQuery(contactsStore)
