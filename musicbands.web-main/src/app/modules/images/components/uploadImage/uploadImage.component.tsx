import React from "react";
import FileUpload from "react-material-file-upload";
import {BandModel} from "../../../bands/models/band.model";
import {ImageType} from "../../enums/image.type";
import {useFacade} from "./uploadImage.hooks";

interface UploadImageComponentProps {
    band: BandModel;
    type: ImageType;
    onUploaded: Function;
}

export const UploadImageComponent: React.FC<UploadImageComponentProps> = (props: UploadImageComponentProps) => {
    const {
        band,
        type,
        onUploaded
    } = props;

    const [
        {
            isLoading
        },
        handleChanges
    ] = useFacade(band, type, onUploaded);

    return (
        <FileUpload
            disabled={isLoading}
            value={[]}
            onChange={(files) => {handleChanges(files)}}
        />
    )
}