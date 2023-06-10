import * as React from "react";
import {Box, Grid, Typography} from "@mui/material";
import {BandModel} from "../../../bands/models/band.model";
import {useFacade} from "./manageImages.hooks";
import {ManageProfileImageComponent} from "../manageProfileImage/manageProfileImage.component";
import {ImageType} from "../../enums/image.type";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {ManageGalleryImageComponent} from "../manageGalleryImages/manageGalleryImages.component";
import {useTranslation} from "react-i18next";

interface ManageImagesComponentProps {
    band: BandModel;
}

export const ManageImagesComponent: React.FC<ManageImagesComponentProps> = (props: ManageImagesComponentProps) => {
    const {
        band
    } = props;

    const [
        {
            isLoading,
            images,
        }
    ] = useFacade(band);

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    const profileImage = images.find(x => x.type === ImageType.Profile);
    const galleryImages = images.filter(x => x.type === ImageType.Gallery);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3}>
                <Box>
                    <Typography gutterBottom variant="h5" component="div">
                        {t('ManageImagesComponent.profileImage')}
                    </Typography>
                </Box>
                <Box sx={{ border: 1, borderStyle: 'dotted', borderRadius: 2 }} mt={2} p={1}>
                    <ManageProfileImageComponent band={band} image={profileImage}/>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
                <Box style={{border: '2 px dotted black'}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {t('ManageImagesComponent.galleryImages')}
                    </Typography>
                </Box>
                <Box sx={{ border: 1, borderStyle: 'dotted', borderRadius: 2 }} mt={2} p={1}>
                    <ManageGalleryImageComponent band={band} images={galleryImages}/>
                </Box>
            </Grid>
        </Grid>
    )
}