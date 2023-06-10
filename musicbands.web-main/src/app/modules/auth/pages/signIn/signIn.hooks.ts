import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {SignInModel} from "../../models/signIn.model";
import {useNavigate} from "react-router";
import {navigationService} from "../../../_common/services/navigation.service";
import {authService} from "../../services/auth.service";
import {authQuery} from "../../stores/auth";

interface SignInPageState extends ILoadingState{
    model: SignInModel;
}

export function useFacade(): [SignInPageState, Function, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        model: {
            email: '',
            password: ''
        }
    } as SignInPageState);

    const navigate = useNavigate();

    const handleChanges = (field: string, value: string) => {
        const model = state.model;

        model[field] = value;

        setState(state => ({
            ...state,
            model: model
        }));
    }

    const handleGoToDashboard = () => {
        navigationService.toDashboard(navigate);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setState(state => ({
            ...state,
            isLoading: true
        }));

        authService.signIn(state.model)
            .subscribe({
                next: () => handleGoToDashboard(),
                error: () => setState(state => ({
                    ...state,
                    isLoading: false
                }))
            });
    }

    const handleSignUp = () => {
        navigationService.toSignUp(navigate)
    }

    const handleForgotPassword = () => {
        navigationService.toForgotPassword(navigate)
    }

    useEffect(() => {
        if (authQuery.isAuthorized()) {
            handleGoToDashboard()
        }
    }, [])

    return [
        state,
        handleChanges,
        handleSubmit,
        handleSignUp,
        handleForgotPassword
    ]
}