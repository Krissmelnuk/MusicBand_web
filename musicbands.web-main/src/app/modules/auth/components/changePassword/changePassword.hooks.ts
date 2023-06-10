import {useState} from "react";
import {ILoadingState} from "../../../_common/states/loadingState";
import {authService} from "../../services/auth.service";
import {ChangePasswordModel} from "../../models/changePassword.model";

interface ChangePasswordComponentState extends ILoadingState{
    model: ChangePasswordModel;
}

export function useFacade(): [ChangePasswordComponentState, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        model: {
            oldPassword: '',
            newPassword: ''
        }
    } as ChangePasswordComponentState);

    const handleChanges = (field: string, value: string) => {
        const model = state.model;

        model[field] = value;

        setState(state => ({
            ...state,
            model: model
        }));
    }

    const handleSubmit = () => {
        setState(state => ({
            ...state,
            isLoading: true
        }));

        authService.changePassword(state.model)
            .subscribe({
                next: () => setState(state => ({...state, isLoading: false})),
                error: () => setState(state => ({...state, isLoading: false}))
            });
    }

    return [
        state,
        handleChanges,
        handleSubmit
    ]
}