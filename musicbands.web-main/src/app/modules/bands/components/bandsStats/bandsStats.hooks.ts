import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {bandsService} from "../../services/bands.service";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {bandsQuery} from "../../stores/bands";

interface BandsStatsComponentState extends ILoadingState{
    count: number;
}

export function useFacade(): [BandsStatsComponentState] {
    const [state, setState] = useState({
        isLoading: true,
        count: 0
    } as BandsStatsComponentState);

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<number>(bandsQuery.count$, count => {
                setState(state => ({
                    ...state,
                    count: count
                }));
            }),
        ];

        bandsService.count().subscribe({
            next: () => setState(state => ({
                ...state,
                isLoading: false
            })),
            error: () => setState(state => ({
                ...state,
                isLoading: false
            }))
        });

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, []);

    return [state]
}