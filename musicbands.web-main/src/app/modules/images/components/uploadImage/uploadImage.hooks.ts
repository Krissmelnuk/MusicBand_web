import {useState} from "react";
import {ILoadingState} from "../../../_common/states/loadingState";
import {imagesService} from "../../services/images.service";
import {BandModel} from "../../../bands/models/band.model";
import {ImageType} from "../../enums/image.type";

interface UploadImageComponentState extends ILoadingState{
}

export function useFacade(band: BandModel, type: ImageType, onUploaded: Function): [UploadImageComponentState, Function] {
    const [state, setState] = useState({
        isLoading: false
    } as UploadImageComponentState);

    const handleUpload = (file: File) => {
        setState(state => ({...state, isLoading: true}));

        imagesService.upload(file, band.id, type).subscribe({
            next: (image) => {
                setState(state => ({...state, isLoading: false}));
                onUploaded(image);
            },
            error: () => { setState(state => ({...state, isLoading: false}))},
        });
    }

    const handleChanges = (files: File[]) => {
        if (!files.length) {
            return;
        } else {
            handleUpload(files[0]);
        }
    }

    return [state, handleChanges]
}