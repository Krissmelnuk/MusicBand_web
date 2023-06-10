import React from "react";
import {BandModel} from "../../models/band.model";
import {ContactsListComponent} from "../../../contscts/components/contacsList/contactsList.component";
import {LinksListComponent} from "../../../links/components/linksList/linksList.component";
import {Box, Grid, Typography} from "@mui/material";
import {GalleryComponent} from "../../../images/components/gallery/gallery.component";
import {ProfileImageComponent} from "../../../images/components/profileImage/profileImage.component";
import {ContentListComponent} from "../../../content/components/contentList/contentList.component";
import {MembersListComponent} from "../../../members/components/membersList/membersList.component";

interface BandProfileProps {
    band: BandModel
}

export const BandProfileComponent: React.FC<BandProfileProps> = (props: BandProfileProps) => {
    const band = props.band;

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Box>
                        <Typography gutterBottom variant="h4" component="div">
                            {band.name}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={8} sm={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4}>
                            <Box>
                                <ProfileImageComponent image={band.image}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                            <Box>
                                <ContentListComponent bandId={band.id}/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={2}>
                        <GalleryComponent band={band}/>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                    <Box>
                        <ContactsListComponent bandId={band.id}/>
                    </Box>
                    <Box mt={2}>
                        <LinksListComponent bandId={band.id}/>
                    </Box>
                    <Box mt={2}>
                        <MembersListComponent bandId={band.id}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}