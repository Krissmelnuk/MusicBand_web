import {ILoadingState} from "../../../_common/states/loadingState";
import {useState} from "react";
import {useNavigate} from "react-router";
import {navigationService} from "../../../_common/services/navigation.service";
import {authService} from "../../services/auth.service";
import {RestorePasswordModel} from "../../models/restorePassword.model";

interface RestorePasswordPageState extends ILoadingState{
    model: RestorePasswordModel;
}

export function useFacade(resetPasswordToken: string): [RestorePasswordPageState, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        model: {
            email: '',
            newPassword: '',
            resetPasswordToken: resetPasswordToken.replace(new RegExp(' ', 'g'), '+')
        }
    } as RestorePasswordPageState);

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

        authService.restorePassword(state.model)
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