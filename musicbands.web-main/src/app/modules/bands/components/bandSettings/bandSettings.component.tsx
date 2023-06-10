import {BandModel} from "../../models/band.model";
import React from "react";
import {BandStatusComponent} from "../bandStatus/bandStatus.component";

interface BandSettingsComponentProps {
    band: BandModel;
}

export const BandSettingsComponent: React.FC<BandSettingsComponentProps> = (props: BandSettingsComponentProps) => {
    const {band} = props;

    return (
        <>
            <BandStatusComponent band={band}/>
        </>
    )
}