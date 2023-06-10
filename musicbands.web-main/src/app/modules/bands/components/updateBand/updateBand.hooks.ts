import {useState} from "react";
import {ILoadingState} from "../../../_common/states/loadingState";
import {IDraftState} from "../../../_common/states/draftState";
import {UpdateBandModel} from "../../models/updateBand.model";
import {BandModel} from "../../models/band.model";
import {bandsService} from "../../services/bands.service";

interface UpdateBandComponentState extends ILoadingState, IDraftState {
    model: UpdateBandModel;
}

export function useFacade(band: BandModel): [UpdateBandComponentState, Function, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        hasChanges: false,
        model: {
            id: band.id,
            url: band.url,
            name: band.name,
            status: band.status
        } as UpdateBandModel
    } as UpdateBandComponentState);

    const handleChanges = (fieldId: string, value: string) => {
        const model = state.model;

        model[fieldId] = value;

        setState(state => ({
            ...state,
            hasChanges: true,
            model: model
        }));
    }

    const handleDiscard = () => {
        setState(state => ({
            ...state,
            hasChanges: false,
            model: {
                id: band.id,
                url: band.url,
                name: band.name,
                status: band.status
            } as UpdateBandModel
        }));
    }

    const handleSubmit = () => {
        setState(state => ({
            ...state,
            isLoading: true
        }));

        bandsService.updateBand(state.model as UpdateBandModel).subscribe({
            next: () => {
                setState(state => ({...state, isLoading: false, hasChanges: false}))
            },
            error: () => {
                setState(state => ({...state, isLoading: false}))
            }
        });
    }

    return [state, handleChanges, handleDiscard, handleSubmit]
}
