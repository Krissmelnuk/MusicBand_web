import {ILoadingState} from "../../../_common/states/loadingState";
import {useState} from "react";
import {contentService} from "../../services/content.service";
import {CreateContentModel} from "../../models/createContent.model";
import {ContentType} from "../../enums/contentType";
import {IDialogState} from "../../../_common/states/dialogState";

interface CreateContentComponentState extends ILoadingState, IDialogState {
    model: CreateContentModel;
}

const defaultModel = (bandId: string): CreateContentModel => {
    return {
        locale: '',
        bandId: bandId,
        type: ContentType.bio,
        data: ''
    }
}

export function useFacade(bandId: string): [CreateContentComponentState, Function, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        isOpen: false,
        model: defaultModel(bandId)
    } as CreateContentComponentState);

    const handleChanges = (field: string, value: string) => {
        const model = state.model;

        model[field] = value;

        setState(state => ({
            ...state,
            hasChanges: true,
            model: model
        }));
    }

    const handleOpen = () => {
        setState(state => ({
            ...state,
            isOpen: true,
            isLoading: false,
            hasChanges: false,
            model: defaultModel(bandId)
        }));
    }

    const handleClose = () => {
        setState(state => ({
            ...state,
            isOpen: false,
            isLoading: false,
            hasChanges: false,
            model: defaultModel(bandId)
        }));
    }

    const handleSave = () => {
        setState(state => ({
            ...state,
            isLoading: true
        }));

        contentService.create(state.model).subscribe({
            next: () => {handleClose()},
            error: () => {setState(state => ({...state, isLoading: false}))}
        });
    }

    return [
        state,
        handleChanges,
        handleClose,
        handleOpen,
        handleSave
    ]
}