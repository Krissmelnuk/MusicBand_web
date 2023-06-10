import {ILoadingState} from "../../../_common/states/loadingState";
import {useState} from "react";
import {ForgotPasswordModel} from "../../models/forgotPassword.model";
import {useNavigate} from "react-router";
import {navigationService} from "../../../_common/services/navigation.service";
import {authService} from "../../services/auth.service";

interface ForgotPasswordPageState extends ILoadingState{
    model: ForgotPasswordModel;
}

export function useFacade(): [ForgotPasswordPageState, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        model: {
            email: ''
        }
    } as ForgotPasswordPageState);

    const handleChanges = (field: string, value: string) => {
        const model = state.model;

        model[field] = value;

        setState(state => ({
            ...state,
            model: model
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setState(state => ({
            ...state,
            isLoading: true
        }));

        authService.forgotPassword(state.model)
            .subscribe({
                next: () => handleSignIn(),
                error: () => setState(state => ({
                    ...state,
                    isLoading: false
                }))
            });
    }

    const navigate = useNavigate();

    const handleSignIn = () => {
        navigationService.toSignIn(navigate);
    }

    return [
        state,
        handleChanges,
        handleSubmit,
        handleSignIn
    ]
}