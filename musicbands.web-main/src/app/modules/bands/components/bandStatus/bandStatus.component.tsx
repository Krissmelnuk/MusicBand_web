import React from "react";
import {BandModel} from "../../models/band.model";
import {useFacade} from "./bandStatus.hooks";
import {Box, ToggleButton} from "@mui/material";
import {BandStatus} from "../../enums/bandStatus";

interface BandStatusComponentProps {
    band: BandModel;
}

export const BandStatusComponent: React.FC<BandStatusComponentProps> = (props: BandStatusComponentProps) => {
    const {band} = props;

    const [
        {
            isLoading
        },
        handlePublish,
        handleMarkAsDraft
    ] = useFacade(band);

    const getButtonLabel = () => {
        if (isLoading) {
            return '...Loading'
        }

        switch (band.status) {
            case BandStatus.Draft: return 'Publish';
            case BandStatus.Published: return 'Mark as Draft';
            default: return;
        }
    }

    return (
        <>
            <Box width="150px">
                <ToggleButton
                    fullWidth
                    value="check"
                    selected={band.status === BandStatus.Published}
                    onChange={() => {
                        switch (band.status) {
                            case BandStatus.Draft: return handlePublish();
                            case BandStatus.Published: return handleMarkAsDraft();
                            default: return;
                        }
                    }}
                >
                    {
                        getButtonLabel()
                    }
                </ToggleButton>
            </Box>
        </>
    )
}