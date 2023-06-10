import {ILoadingState} from "../../../_common/states/loadingState";
import {useState} from "react";
import {bandsService} from "../../services/bands.service";
import {BandModel} from "../../models/band.model";

interface BandStatusComponentState extends ILoadingState {

}

export function useFacade(band: BandModel): [BandStatusComponentState, Function, Function] {
    const [state, setState] = useState({
        isLoading: false
    } as BandStatusComponentState);

    const handlePublish = () => {
        setState(state => ({...state, isLoading: true}))
        bandsService.publish(band.id).subscribe({
            next: () => {setState(state => ({...state, isLoading: false}))},
            error: () => {setState(state => ({...state, isLoading: false}))}
        });
    }

    const handleMarkAsDraft = () => {
        setState(state => ({...state, isLoading: true}))
        bandsService.markAsDraft(band.id).subscribe({
            next: () => {setState(state => ({...state, isLoading: false}))},
            error: () => {setState(state => ({...state, isLoading: false}))}
        });
    }

    return [state, handlePublish, handleMarkAsDraft]
}