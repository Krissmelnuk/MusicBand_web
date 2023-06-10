import {ILoadingState} from "../../../_common/states/loadingState";
import {useState} from "react";
import {LinkModel} from "../../models/link.model";
import {linksService} from "../../services/links.service";
import {UpdateLinkModel} from "../../models/updateLink.model";
import {IDraftState} from "../../../_common/states/draftState";
import {IDialogState} from "../../../_common/states/dialogState";

interface UpdateLinkComponentState extends ILoadingState, IDraftState, IDialogState {
    model: UpdateLinkModel;
}

const createModel = (link: LinkModel): UpdateLinkModel => {
    return {
        id: link.id,
        name: link.name,
        description: link.description,
        isPublic: link.isPublic,
        value: link.value
    }
}

export function useFacade(link: LinkModel): [
    UpdateLinkComponentState,
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
        model: createModel(link)
    } as UpdateLinkComponentState);

    const handleOpen = () => {
        setState(state => ({
            ...state,
            isOpen: true,
            isLoading: false,
            hasChanges: false,
            model: createModel(link)
        }));
    }

    const handleClose = () => {
        setState(state => ({
            ...state,
            isOpen: false,
            isLoading: false,
            hasChanges: false,
            model: createModel(link)
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
        linksService.update(state.model).subscribe({
            next: () => {handleClose()},
            error: () => {setState(state => ({...state, isLoading: false}))}
        });
    }

    const discardChanges = () => {
        setState(state => ({
            ...state,
            hasChanges: false,
            model: createModel(link)
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