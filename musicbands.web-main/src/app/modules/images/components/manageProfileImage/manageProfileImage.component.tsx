import React from "react";
import {Box} from "@mui/material";
import {ImageModel} from "../../models/image.model";
import {BandModel} from "../../../bands/models/band.model";
import {ManageImageComponent} from "../manageImage/manageImage.component";
import {UploadImageComponent} from "../uploadImage/uploadImage.component";
import {ImageType} from "../../enums/image.type";

interface ManageProfileImageComponent {
    image: ImageModel;
    band: BandModel;
}

export const ManageProfileImageComponent: React.FC<ManageProfileImageComponent> = (props: ManageProfileImageComponent) => {
    const {
        image,
        band
    } = props;

    const renderContent = () => {
        if (image) {
            return <ManageImageComponent image={image}/>
        }

        return <UploadImageComponent band={band} type={ImageType.Profile} onUploaded={() => {}}/>
    }

    return (
        <Box>
            {
                renderContent()
            }
        </Box>
    );
}