import {ILoadingState} from "../../../_common/states/loadingState";
import {useState} from "react";
import {CreateContactModel} from "../../models/createContact.model";
import {ContactType} from "../../enums/contactType";
import {contactsService} from "../../services/contacts.service";
import {IDialogState} from "../../../_common/states/dialogState";

interface CreateContactComponentState extends ILoadingState, IDialogState {
    model: CreateContactModel;
}

const createEmptyModel = (bandId: string): CreateContactModel => {
    return {
        bandId: bandId,
        name: '',
        description: '',
        isPublic: true,
        value: '',
        type: ContactType.Phone
    }
}

export function useFacade(bandId: string): [CreateContactComponentState, Function, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        isOpen: false,
        model: createEmptyModel(bandId)
    } as CreateContactComponentState);

    const handleOpen = () => {
        setState(state => ({
            ...state,
            isOpen: true,
            isLoading: false,
            model: createEmptyModel(bandId)
        }));
    }

    const handleClose = () => {
        setState(state => ({
            ...state,
            isOpen: false,
            isLoading: false,
            model: createEmptyModel(bandId)
        }));
    }

    const handleChanges = (field: string, value: string) => {
        const model = state.model;

        model[field] = value;

        setState(state => ({
            ...state,
            model: model
        }));
    }

    const handleSave = () => {
        setState(state => ({...state, isLoading: true}));
        contactsService.create(state.model).subscribe({
            next: () => {handleClose()},
            error: () => {setState(state => ({...state, isLoading: false}))}
        });
    }

    return [
        state,
        handleOpen,
        handleClose,
        handleChanges,
        handleSave
    ]
}