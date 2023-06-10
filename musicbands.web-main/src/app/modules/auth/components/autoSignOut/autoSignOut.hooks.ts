import { useEffect } from "react";
import {interval, Subscription} from 'rxjs';
import {useNavigate} from "react-router";
import {authQuery} from "../../stores/auth";
import {authService} from "../../services/auth.service";
import {navigationService} from "../../../_common/services/navigation.service";

export function useFacade(): void {
    const period = 10000;
    const sourceTimer = interval(period);
    const navigate = useNavigate();

    const checkIsAuthorized = () => {
        if (authQuery.getToken() && !authQuery.isAuthorized()) {
            authService.signOut();
            navigationService.toSignIn(navigate);
        }
    }

    const useEffectCB = () => {
        const subscriptions: Subscription[] = [
            sourceTimer.subscribe(checkIsAuthorized)
        ];

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }

    useEffect(useEffectCB, []);
}
