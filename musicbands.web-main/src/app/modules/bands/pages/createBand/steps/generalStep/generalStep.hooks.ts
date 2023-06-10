import {useState} from 'react'
import {CreateBandModel} from "../../../../models/createBand.model";
import {ILoadingState} from "../../../../../_common/states/loadingState";
import {bandsService} from "../../../../services/bands.service";
import {BandModel} from "../../../../models/band.model";
import {UpdateBandModel} from "../../../../models/updateBand.model";

interface GeneralStepComponentState extends ILoadingState {
    model: CreateBandModel | UpdateBandModel;
}

const createModel = (band: BandModel): CreateBandModel | UpdateBandModel => {
    if (band) {
        return {
            id: band.id,
            url: band.url,
            name: band.name,
            status: band.status
        } as UpdateBandModel;
    }

    return {
        url: '',
        name: ''
    } as CreateBandModel
}

export function useFacade(band: BandModel): [GeneralStepComponentState, Function, Function] {
    const [state, setState] = useState({
        isLoading: false,
        model: createModel(band)
    } as GeneralStepComponentState);

    const handleChanges = (fieldId: string, value: string) => {
        const model = state.model;

        model[fieldId] = value;

        setState(state => ({
            ...state,
            model: model
        }));
    }

    const createBand = (callback: Function) => {
        bandsService.createBand(state.model as CreateBandModel).subscribe({
            next: (band) => {
                callback(band);
            },
            error: () => {
                setState(state => ({
                    ...state,
                    isLoading: false
                }))
            }
        });
    }

    const updateBand = (callback: Function) => {
        bandsService.updateBand(state.model as UpdateBandModel).subscribe({
            next: (band) => {
                callback(band);
            },
            error: () => {
                setState(state => ({
                    ...state,
                    isLoading: false
                }))
            }
        });
    }

    const handleSubmit = (callback: Function) => {
        setState(state => ({
            ...state,
            isLoading: true
        }));

        if (band) {
            updateBand(callback);
        } else {
            createBand(callback);
        }
    }

    return [state, handleChanges, handleSubmit]
}
