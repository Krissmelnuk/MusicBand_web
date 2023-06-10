import React from "react";
import {Card, Paper} from "@mui/material";
import {ImageModel} from "../../models/image.model";
import {imagesService} from "../../services/images.service";
import {defaultImageSrc} from "../../constants/defaultImageSrc";

interface ImageComponentProps {
    image: ImageModel;
    round?: boolean;
}

export const ImageComponent: React.FC<ImageComponentProps> = (props: ImageComponentProps) => {
    const {
        image,
        round = false
    } = props;

    const imageSrc = image
        ? imagesService.downloadLink(image)
        : defaultImageSrc;

    return (
        <Card sx={{borderRadius: round ? '50%' : '0'}}>
            <Paper
                elevation={0}
                square={true}
                sx={{
                    background: 'url(' + imageSrc + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                    padding:'50%'
                }}
            >
            </Paper>
        </Card>
    )
}