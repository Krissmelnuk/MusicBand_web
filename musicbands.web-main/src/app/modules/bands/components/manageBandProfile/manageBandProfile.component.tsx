import React from "react";
import {BandModel} from "../../models/band.model";
import {Box, Divider, Grid, Typography} from "@mui/material";
import {UpdateBandComponent} from "../updateBand/updateBand.component";
import {ManageLinksComponent} from "../../../links/components/manageLinks/manageLinks.component";
import {ManageContactsComponent} from "../../../contscts/components/manageContacts/manageContacts.component";
import {useTranslation} from "react-i18next";
import {ManageImagesComponent} from "../../../images/components/manageImages/manageImages.component";
import {ManageContentComponent} from "../../../content/components/manageContent/manageContent.component";

interface BandProfileProps {
    band: BandModel
}

export const ManageBandProfileComponent: React.FC<BandProfileProps> = (props: BandProfileProps) => {
    const band = props.band;

    const {t} = useTranslation();

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Box>
                        <h1>{t('ManageBandProfileComponent.manage')} {band.name}</h1>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item md={4} sm={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        {t('ManageBandProfileComponent.profile')}
                    </Typography>
                    <UpdateBandComponent band={band}/>
                </Grid>
                <Grid item md={8} sm={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        {t('ManageBandProfileComponent.content')}
                    </Typography>
                    <ManageContentComponent bandId={band.id}/>
                </Grid>
                <Grid item md={12} sm={12}>
                    <ManageImagesComponent band={band}/>
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        {t('ManageBandProfileComponent.links')}
                    </Typography>
                    <ManageLinksComponent bandId={band.id}/>
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        {t('ManageBandProfileComponent.contacts')}
                    </Typography>
                    <ManageContactsComponent bandId={band.id}/>
                </Grid>
            </Grid>
        </Box>
    )
}