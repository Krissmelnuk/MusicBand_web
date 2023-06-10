import {ILoadingState} from "../../../_common/states/loadingState";
import {BandModel} from "../../models/band.model";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {bandsQuery} from "../../stores/bands";
import {bandsService} from "../../services/bands.service";
import {useNavigate} from "react-router";
import {navigationService} from "../../../_common/services/navigation.service";

interface MyBandsComponentState extends ILoadingState{
    bands: BandModel[];
}

export function useFacade(): [MyBandsComponentState, Function, Function] {
    const navigate = useNavigate();
    const [state, setState] = useState({
        isLoading: true,
        bands: []
    } as MyBandsComponentState);

    const handleView = (band: BandModel) => {
        navigationService.toManageBandProfile(navigate, band.id)
    }

    const handleCreate = () => {
        navigationService.toCreateBand(navigate);
    }

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<BandModel[]>(bandsQuery.myBand$, bands => {
                setState(state => ({
                    ...state,
                    bands: bands
                }));
            }),
        ];

        bandsService.getMyBands().subscribe({
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

    return [state, handleView, handleCreate]
}