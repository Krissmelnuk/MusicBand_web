import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {SignUpModel} from "../../models/signUp.model";
import {navigationService} from "../../../_common/services/navigation.service";
import {authQuery} from "../../stores/auth";
import {authService} from "../../services/auth.service";
import {useTranslation} from "react-i18next";

interface SignUpPageState extends ILoadingState{
    model: SignUpModel;
}

export function useFacade(): [SignUpPageState, Function, Function, Function] {
    const { i18n } = useTranslation();
    const [state, setState] = useState({
        isLoading: false,
        model: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            locale: i18n.language
        }
    } as SignUpPageState);

    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigationService.toDashboard(navigate);
    }

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

        authService.signUp(state.model)
            .subscribe({
                next: () => handleGoToDashboard(),
                error: () => setState(state => ({
                    ...state,
                    isLoading: false
                }))
            });
    }

    const handleSignIn = () => {
        navigationService.toSignIn(navigate);
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
        handleSignIn
    ]
}