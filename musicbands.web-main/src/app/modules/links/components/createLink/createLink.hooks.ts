import {ILoadingState} from "../../../_common/states/loadingState";
import {useState} from "react";
import {linksService} from "../../services/links.service";
import {CreateLinkModel} from "../../models/createLink.model";
import {LinkType} from "../../enums/linkType";
import {IDialogState} from "../../../_common/states/dialogState";

interface CreateLinkComponentState extends ILoadingState, IDialogState {
    model: CreateLinkModel;
}

const createEmptyModel = (bandId: string): CreateLinkModel => {
    return {
        bandId: bandId,
        name: '',
        description: '',
        isPublic: true,
        value: '',
        type: LinkType.Instagram
    }
}

export function useFacade(bandId: string): [CreateLinkComponentState, Function, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        isOpen: false,
        model: createEmptyModel(bandId)
    } as CreateLinkComponentState);

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

    const saveChanges = () => {
        setState(state => ({...state, isLoading: true}));
        linksService.create(state.model).subscribe({
            next: () => {handleClose()},
            error: () => {setState(state => ({...state, isLoading: false}))}
        });
    }

    return [
        state,
        handleOpen,
        handleClose,
        handleChanges,
        saveChanges
    ]
}