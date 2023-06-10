import {ILoadingState} from "../../../_common/states/loadingState";
import {useState} from "react";
import {UpdateContactModel} from "../../models/updateContact.model";
import {ContactModel} from "../../models/contact.model";
import {contactsService} from "../../services/contacts.service";
import {IDraftState} from "../../../_common/states/draftState";
import {IDialogState} from "../../../_common/states/dialogState";

interface UpdateContactComponentState extends ILoadingState, IDraftState, IDialogState {
    model: UpdateContactModel;
}

const createModel = (contact: ContactModel): UpdateContactModel => {
    return {
        id: contact.id,
        name: contact.name,
        description: contact.description,
        isPublic: contact.isPublic,
        value: contact.value
    }
}

export function useFacade(contact: ContactModel): [
    UpdateContactComponentState,
    Function,
    Function,
    Function,
    Function,
    Function
] {
    const [state, setState] = useState({
        isOpen: false,
        isLoading: false,
        hasChanges: false,
        model: createModel(contact)
    } as UpdateContactComponentState);

    const handleOpen = () => {
        setState(state => ({
            ...state,
            isOpen: true,
            isLoading: false,
            hasChanges: false,
            model: createModel(contact)
        }));
    }

    const handleClose = () => {
        setState(state => ({
            ...state,
            isOpen: false,
            isLoading: false,
            hasChanges: false,
            model: createModel(contact)
        }));
    }

    const handleChanges = (field: string, value: string) => {
        const model = state.model;

        model[field] = value;

        setState(state => ({
            ...state,
            hasChanges: true,
            model: model
        }));
    }

    const saveChanges = () => {
        setState(state => ({...state, isLoading: true}));
        contactsService.update(state.model).subscribe({
            next: () => {handleClose()},
            error: () => {setState(state => ({...state, isLoading: false}))}
        });
    }

    const discardChanges = () => {
        setState(state => ({
            ...state,
            hasChanges: false,
            model: {
                id: contact.id,
                name: contact.name,
                description: contact.description,
                isPublic: contact.isPublic,
                value: contact.value
            } as UpdateContactModel
        }))
    }

    return [
        state,
        handleOpen,
        handleClose,
        handleChanges,
        saveChanges,
        discardChanges
    ]
}