import {useState} from "react";
import {ILoadingState} from "../../../_common/states/loadingState";
import {imagesService} from "../../services/images.service";
import {ImageModel} from "../../models/image.model";
import {defaultImageSrc} from "../../constants/defaultImageSrc";

interface ManageImageComponentState extends ILoadingState{
}

export function useFacade(image: ImageModel): [ManageImageComponentState, Function, Function] {
    const [state, setState] = useState({
        isLoading: false
    } as ManageImageComponentState);

    const getImageSource = () => {
        return image
            ? imagesService.downloadLink(image)
            : defaultImageSrc;
    }

    const handleDelete = () => {
        setState(state => ({...state, isLoading: true}));

        imagesService.delete(image.id).subscribe({
            next: () => { setState(state => ({...state, isLoading: false}))},
            error: () => { setState(state => ({...state, isLoading: false}))},
        });
    }

    return [state, getImageSource, handleDelete]
}