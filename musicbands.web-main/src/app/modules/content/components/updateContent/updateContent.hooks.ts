import {ILoadingState} from "../../../_common/states/loadingState";
import {useState} from "react";
import {ContentModel} from "../../models/content.model";
import {UpdateContentModel} from "../../models/updateContent.model";
import {IDraftState} from "../../../_common/states/draftState";
import {contentService} from "../../services/content.service";

interface UpdateContentComponentState extends ILoadingState, IDraftState {
    model: UpdateContentModel;
}

export function useFacade(content: ContentModel): [UpdateContentComponentState, Function, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        hasChanges: false,
        model: {
            id: content.id,
            data: content.data
        }
    } as UpdateContentComponentState);

    const handleChanges = (field: string, value: string) => {
        const model = state.model;

        model[field] = value;

        setState(state => ({
            ...state,
            hasChanges: true,
            model: model
        }));
    }

    const handleDiscard = () => {
        setState(state => ({
            ...state,
            hasChanges: false,
            model: {
                id: content.id,
                data: content.data
            }
        }));
    }

    const handleSave = () => {
        setState(state => ({
            ...state,
            isLoading: true
        }));

        contentService.update(state.model).subscribe({
            next: () => {setState(state => ({...state, isLoading: false, hasChanges: false}))},
            error: () => {setState(state => ({...state, isLoading: false, hasChanges: false}))}
        });
    }

    const handleDelete = () => {
        setState(state => ({
            ...state,
            isLoading: true
        }));

        contentService.delete(content.id).subscribe({
            next: () => {setState(state => ({...state, isLoading: false}))},
            error: () => {setState(state => ({...state, isLoading: false}))}
        });
    }

    return [
        state,
        handleChanges,
        handleDiscard,
        handleSave,
        handleDelete
    ]
}