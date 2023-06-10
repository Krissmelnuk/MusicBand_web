import React, {useEffect, useState} from 'react'
import {BandModel} from "../../models/band.model";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {bandsQuery} from "../../stores/bands";
import {bandsService} from "../../services/bands.service";
import {ILoadingState} from "../../../_common/states/loadingState";

interface BandProfilePageState extends ILoadingState{
    band: BandModel;
}

export function useFacade(bandUrl: string): [BandProfilePageState] {
    const [state, setState] = useState({
        isLoading: true,
        band: null
    } as BandProfilePageState);

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<BandModel>(bandsQuery.band$, band => {
                setState(state => ({
                    ...state,
                    band: band
                }));
            }),
        ];

        bandsService.getBandByUrl(bandUrl).subscribe({
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
    }, [bandUrl]);

    return [state]
}
