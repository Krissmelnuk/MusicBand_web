import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../helpers/onEmit";
import {SnackMessageModel} from "../../models/snackMessage.model";
import {snackService} from "../../services/snack.service";

interface SnackBarComponentState {
    isOpen: boolean;
    message: SnackMessageModel;
}

export function useFacade(): [SnackBarComponentState] {
    const [state, setState] = useState({
        isOpen: false,
        message: null
    } as SnackBarComponentState);

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<SnackMessageModel>(snackService.onMessage, message => {
                setState(state => ({
                    ...state,
                    isOpen: true,
                    message: message
                }));

                setTimeout(() => {
                    setState(state => ({
                        ...state,
                        isOpen: false,
                        message: null
                    }));
                }, 3000);
            })
        ];

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, []);

    return [state];
}
