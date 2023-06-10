import React from "react";
import {ImageModel} from "../../models/image.model";
import {ImageComponent} from "../image/image.component";

interface ProfileImageComponentProps {
    image: ImageModel;
}

export const ProfileImageComponent: React.FC<ProfileImageComponentProps> = (props: ProfileImageComponentProps) => {
    const {
        image
    } = props;

    return <ImageComponent round image={image}/>
}