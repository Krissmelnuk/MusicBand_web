import {ILoadingState} from "../../../_common/states/loadingState";
import {ImageModel} from "../../models/image.model";
import {BandModel} from "../../../bands/models/band.model";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {imagesQuery} from "../../stores/images";
import {imagesService} from "../../services/images.service";

interface ManageImagesComponentState extends ILoadingState {
    images: ImageModel[]
}

export function useFacade(band: BandModel): [ManageImagesComponentState] {
    const [state, setState] = useState({
        isLoading: true,
        images: []
    } as ManageImagesComponentState);

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<ImageModel[]>(imagesQuery.images$, images => {
                setState(state => ({
                    ...state,
                    images: images
                }));
            }),
        ];

        imagesService.getBandImages(band.id).subscribe({
            next: () => setState(state => ({...state, isLoading: false})),
            error: () => setState(state => ({...state, isLoading: false}))
        });

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, [band])

    return [state]
}