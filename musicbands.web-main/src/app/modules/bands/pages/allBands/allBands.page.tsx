import React from "react";
import {useFacade} from "./allBands.hooks";
import {LayoutComponent} from "../../../_common/components/layout/layout.component";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {BandNotFoundComponent} from "../../components/bandNotFound/bandNotFound.component";
import {Box, Container, Grid} from "@mui/material";
import {BandCardComponent} from "../../components/bandCard/bandCard.component";
import {BandsSearchBarComponent} from "../../components/bandsSearchBar/bandsSearchBar.component";
import {useTranslation} from "react-i18next";
import {MenuItemType} from "../../../_common/enums/menuItemType";

export const AllBandsPage: React.FC = () => {
    const [
        {
            isLoading,
            bands
        },
        handleView,
        handleLike,
        handleSearch
    ] = useFacade();

    const {t} = useTranslation();

    const renderContent = () => {
        if (isLoading) {
            return (
                <LoaderComponent />
            )
        }

        if (bands === null || !bands.length) {
            return (
                <BandNotFoundComponent />
            )
        }

        return (
            <>
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
            </>
        );
    }

    return (
        <LayoutComponent menuItem={MenuItemType.Other} title={t('AllBandsPage.title')}>
            <Container component="main" maxWidth="lg">
                <Box>
                    <BandsSearchBarComponent handleSearch={handleSearch}/>
                </Box>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        {
                            renderContent()
                        }
                    </Grid>
                </Box>
            </Container>
        </LayoutComponent>
    )
}