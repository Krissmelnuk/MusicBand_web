import {ILoadingState} from "../../../_common/states/loadingState";
import {BandModel} from "../../models/band.model";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {bandsQuery} from "../../stores/bands";
import {bandsService} from "../../services/bands.service";
import {useNavigate} from "react-router";
import {navigationService} from "../../../_common/services/navigation.service";

interface RecentBandsComponentState extends ILoadingState{
    bands: BandModel[];
}

export function useFacade(amount: number): [RecentBandsComponentState, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: true,
        bands: []
    } as RecentBandsComponentState);

    const navigate = useNavigate();

    const handleView = (band: BandModel) => {
        navigationService.toBandProfile(navigate, band.url);
    }

    const handleLike = (band: BandModel) => {
        bandsService.like(band.id).subscribe({
            next: () => {},
            error: () => {}
        });
    }

    const handleViewMore = () => {
        navigationService.toAllBands(navigate);
    }

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<BandModel[]>(bandsQuery.recentBand$, bands => {
                setState(state => ({
                    ...state,
                    bands: bands
                }));
            }),
        ];

        bandsService.getRecentBands(amount).subscribe({
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
    }, [amount]);

    return [state, handleView, handleLike, handleViewMore]
}