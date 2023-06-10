import {useState} from "react";
import {ILoadingState} from "../../../_common/states/loadingState";
import {authService} from "../../services/auth.service";
import {UpdateIdentityModel} from "../../models/updateIdentity.model";
import {authQuery} from "../../stores/auth";
import {IDraftState} from "../../../_common/states/draftState";

interface UpdateIdentityComponentState extends ILoadingState, IDraftState {
    model: UpdateIdentityModel;
}

export function useFacade(): [UpdateIdentityComponentState, Function, Function, Function] {
    const identity = authQuery.getIdentity();
    const [state, setState] = useState({
        isLoading: false,
        hasChanges: false,
        model: {
            firstName: identity.firstName,
            lastName: identity.lastName,
            locale: identity.locale
        }
    } as UpdateIdentityComponentState);

    const handleChanges = (field: string, value: string) => {
        const model = state.model;

        model[field] = value;

        setState(state => ({
            ...state,
            model: model,
            hasChanges: true
        }));
    }

    const handleDiscard = () => {
        const identity = authQuery.getIdentity()

        setState(state => ({
            ...state,
            hasChanges: false,
            model: {
                firstName: identity.firstName,
                lastName: identity.lastName,
                locale: identity.locale
            }
        }));
    }

    const handleSubmit = () => {
        setState(state => ({
            ...state,
            isLoading: true
        }));

        authService.updateIdentity(state.model)
            .subscribe({
                next: () => setState(state => ({...state, isLoading: false, hasChanges: false})),
                error: () => setState(state => ({...state, isLoading: false, hasChanges: false}))
            });
    }

    return [
        state,
        handleChanges,
        handleDiscard,
        handleSubmit
    ]
}