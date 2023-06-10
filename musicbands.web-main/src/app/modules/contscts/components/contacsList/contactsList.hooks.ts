import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {ContactModel} from "../../models/contact.model";
import {contactsQuery} from "../../stores/contacts";
import {contactsService} from "../../services/contacts.service";

interface ContactsListComponentState extends ILoadingState{
    contacts: ContactModel[];
}

export function useFacade(bandId: string): [ContactsListComponentState] {
    const [state, setState] = useState({
        isLoading: true,
        contacts: []
    } as ContactsListComponentState);

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

    return [state]
}