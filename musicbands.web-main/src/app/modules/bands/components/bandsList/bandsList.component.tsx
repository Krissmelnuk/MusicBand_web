import React from "react";
import {BandModel} from "../../models/band.model";
import {Box, Button, Grid} from "@mui/material";
import {BandCardComponent} from "../bandCard/bandCard.component";

interface BandsListComponentProps {
    bands: BandModel[];
    handleView: Function;
    handleLike: Function;
    handleAction: Function;
    actionTitle: string;
}

export const BandsListComponent: React.FC<BandsListComponentProps> = (props: BandsListComponentProps) => {
    const {
        bands,
        handleView,
        handleLike,
        handleAction,
        actionTitle
    } = props;

    return (
        <Box>
            <Grid container spacing={2}>
                {
                    bands.map((band, index) => {
                        return (
                            <Grid key={index} item md={3} sm={6} xs={12}>
                                <BandCardComponent
                                    band={band}
                                    handleView={handleView}
                                    handleLike={handleLike}
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>
            {
                handleAction &&
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button color="secondary" size="small" onClick={() => handleAction()}>
                        {actionTitle}
                    </Button>
                </Box>
            }
        </Box>
    )
}