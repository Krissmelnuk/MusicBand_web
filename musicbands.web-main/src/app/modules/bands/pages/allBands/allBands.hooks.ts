import {ILoadingState} from "../../../_common/states/loadingState";
import {BandModel} from "../../models/band.model";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {bandsQuery} from "../../stores/bands";
import {bandsService} from "../../services/bands.service";
import {navigationService} from "../../../_common/services/navigation.service";
import {useNavigate} from "react-router";

interface AllBandsPageState extends ILoadingState{
    bands: BandModel[];
}

export function useFacade(): [AllBandsPageState, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: true,
        bands: []
    } as AllBandsPageState);

    const fetchBands = (name?: string) => {
        setState(state => ({
            ...state,
            isLoading: true
        }));

        bandsService.selectBands(name).subscribe({
            next: () => setState(state => ({
                ...state,
                isLoading: false
            })),
            error: () => setState(state => ({
                ...state,
                isLoading: false
            }))
        });
    }

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

    const handleSearch = (name: string) => {
        fetchBands(name);
    }


    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<BandModel[]>(bandsQuery.bands$, bands => {
                setState(state => ({
                    ...state,
                    bands: bands
                }));
            }),
        ];

        fetchBands();

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, []);

    return [state, handleView, handleLike, handleSearch]
}