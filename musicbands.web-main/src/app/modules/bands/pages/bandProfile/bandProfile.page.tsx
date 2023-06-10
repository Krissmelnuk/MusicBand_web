import React from 'react'
import {useFacade} from './bandProfile.hooks'
import {useParams} from "react-router"
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {LayoutComponent} from "../../../_common/components/layout/layout.component";
import {BandProfileComponent} from "../../components/bandProfile/bandProfile.component";
import {BandNotFoundComponent} from "../../components/bandNotFound/bandNotFound.component";
import {useTranslation} from "react-i18next";
import {Container} from "@mui/material";
import {MenuItemType} from "../../../_common/enums/menuItemType";

export const BandProfilePage: React.FC = () => {
    let {bandUrl} = useParams();

    const [
        {
            isLoading,
            band
        }
    ] = useFacade(bandUrl)

    const {t} = useTranslation();

    if (isLoading) {
        return (
            <LayoutComponent menuItem={MenuItemType.Other} title={t('BandProfilePage.defaultTitle')}>
                <LoaderComponent />
            </LayoutComponent>
        )
    }

    if (band === null) {
        return (
            <LayoutComponent menuItem={MenuItemType.Other} title={t('BandProfilePage.errorTitle')}>
                <BandNotFoundComponent />
            </LayoutComponent>
        )
    }

    return (
        <LayoutComponent menuItem={MenuItemType.Other} title={band?.name ?? t('BandProfilePage.defaultTitle')}>
            <Container component="main" maxWidth="lg">
                <BandProfileComponent band={band}/>
            </Container>
        </LayoutComponent>
    )
}
