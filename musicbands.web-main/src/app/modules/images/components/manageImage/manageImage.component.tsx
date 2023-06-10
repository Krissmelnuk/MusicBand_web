import React from "react";
import {Card, CardActions, CardMedia, IconButton} from "@mui/material";
import {ImageModel} from "../../models/image.model";
import DeleteIcon from '@mui/icons-material/Delete';
import {useFacade} from "./manageImage.hooks";

interface ManageImageComponentProps {
    image: ImageModel;
}

export const ManageImageComponent: React.FC<ManageImageComponentProps> = (props: ManageImageComponentProps) => {
    const {
        image
    } = props;

    const [
        {
            isLoading
        },
        getImageSource,
        handleDelete
    ] = useFacade(image);

    const src = getImageSource();

    console.log(src);

    return (
        <Card>
            <CardMedia
                component="img"
                image={src}
                alt="profile image"
            />
            <CardActions disableSpacing>
                <IconButton disabled={isLoading} onClick={() => handleDelete()}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}