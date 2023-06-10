import React from "react";
import {Grid} from "@mui/material";
import {ImageModel} from "../../models/image.model";
import {BandModel} from "../../../bands/models/band.model";
import {ManageImageComponent} from "../manageImage/manageImage.component";
import {UploadImageComponent} from "../uploadImage/uploadImage.component";
import {ImageType} from "../../enums/image.type";

interface ManageGalleryImagesComponent {
    images: ImageModel[];
    band: BandModel;
}

export const ManageGalleryImageComponent: React.FC<ManageGalleryImagesComponent> = (props: ManageGalleryImagesComponent) => {
    const {
        images,
        band
    } = props;

    return (
        <Grid container spacing={2}>
            {
                images.map((image, index) => {
                    return (
                        <Grid key={index} item md={4} sm={6} xs={12}>
                            <ManageImageComponent image={image}/>
                        </Grid>
                    )
                })
            }
            <Grid item md={4} sm={6} xs={12}>
                <UploadImageComponent band={band} type={ImageType.Gallery} onUploaded={() => {}}/>
            </Grid>
        </Grid>
    );
}