import React from "react";
import {LayoutComponent} from "../../modules/_common/components/layout/layout.component"
import {Box, Container, Grid} from "@mui/material";
import {RecentBandsComponent} from "../../modules/bands/components/recentBands/recentBands.component";
import {PopularBandsComponent} from "../../modules/bands/components/popularBands/popularBands.component";
import {BandStatsComponent} from "../../modules/bands/components/bandsStats/bandsStats.component";
import {MenuItemType} from "../../modules/_common/enums/menuItemType";

export const HomePage: React.FC = () => {
    return (
        <LayoutComponent title="Music Bands" menuItem={MenuItemType.Home}>
            <Container component="main" maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <BandStatsComponent/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box mt={2}>
                            <RecentBandsComponent amount={4}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <PopularBandsComponent amount={4}/>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Container>
        </LayoutComponent>
    )
}