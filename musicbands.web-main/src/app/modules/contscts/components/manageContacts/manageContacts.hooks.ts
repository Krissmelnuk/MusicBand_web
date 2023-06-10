import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {contactsQuery} from "../../stores/contacts";
import {contactsService} from "../../services/contacts.service";
import {ContactModel} from "../../models/contact.model";

interface ManageContactsComponentState extends ILoadingState{
    contacts: ContactModel[];
}

export function useFacade(bandId: string): [ManageContactsComponentState, Function] {
    const [state, setState] = useState({
        isLoading: true,
        contacts: []
    } as ManageContactsComponentState);

    const handleDelete = (contact) => {
        contactsService.delete(contact.id).subscribe({
            next: () => {},
            error: () => {}
        });
    }

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<ContactModel[]>(contactsQuery.$contacts, contacts => {
                setState(state => ({
                    ...state,
                    contacts: contacts
                }));
            }),
        ];

        contactsService.get(bandId).subscribe({
            next: () => setState(state => ({
                ...state,
                isLoading: false
            })),
            error: () => setState(state => ({
                ...state,
                isLoading: false
            }))
        });

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, [bandId]);

    return [state, handleDelete]
}