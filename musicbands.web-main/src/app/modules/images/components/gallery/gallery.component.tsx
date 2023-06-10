import * as React from "react";
import {Grid} from "@mui/material";
import {BandModel} from "../../../bands/models/band.model";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {useFacade} from "./gallery.hooks";
import {ImageComponent} from "../image/image.component";
import {EmptyPlaceholderComponent} from "../../../_common/components/emptyPlaceholder/emptyPlaceholder.component";
import {useTranslation} from "react-i18next";

interface GalleryComponentProps {
    band: BandModel;
}

export const GalleryComponent: React.FC<GalleryComponentProps> = (props: GalleryComponentProps) => {
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

    if (!images?.length) {
        return <EmptyPlaceholderComponent text={t('GalleryComponent.emptyPlaceholder')}/>
    }

    return (
        <Grid container spacing={2}>
            {
                images.map((image, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={12} md={3}>
                            <ImageComponent image={image}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}