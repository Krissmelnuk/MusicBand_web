import React from 'react'
import {useParams} from "react-router"
import {LoaderComponent} from "../../../_common/components/loader/loader.component";
import {LayoutComponent} from "../../../_common/components/layout/layout.component";
import {BandNotFoundComponent} from "../../components/bandNotFound/bandNotFound.component";
import {useTranslation} from "react-i18next";
import {BandProfileMode, useFacade} from "./manageBandProfile.hooks";
import {MenuItemType} from "../../../_common/enums/menuItemType";
import {LayoutWithMenuComponent} from "../../../_common/components/layoutWithMenu/layoutWithMenu.component";
import {Box, Container, Switch, Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {BandProfileComponent} from "../../components/bandProfile/bandProfile.component";

export const ManageBandProfilePage: React.FC = () => {
    let {id} = useParams();

    const [
        {
            isLoading,
            currentSection,
            band,
            mode
        },
        menuItems,
        sections,
        handleModeChanges
    ] = useFacade(id)

    const {t} = useTranslation();

    if (isLoading) {
        return (
            <LayoutComponent  menuItem={MenuItemType.Other} title={t('ManageBandProfilePage.defaultTitle')}>
                <LoaderComponent />
            </LayoutComponent>
        )
    }

    if (band === null) {
        return (
            <LayoutComponent  menuItem={MenuItemType.Other} title={t('ManageBandProfilePage.errorTitle')}>
                <BandNotFoundComponent />
            </LayoutComponent>
        )
    }

    const renderManageSection = () => {
        const menuItem = menuItems.find(x => x.type as number === currentSection as number);
        return (
            <Box>
                <Box>
                    <Typography gutterBottom variant="h5" component="div">
                        {t(menuItem.name)}
                    </Typography>
                </Box>
                <Box mt={2}>
                    {sections.get(currentSection)}
                </Box>
            </Box>
        )
    }

    return (
        <LayoutWithMenuComponent menuItems={menuItems} menuItem={MenuItemType.Dashboard} title={t('ManageBandProfilePage.defaultTitle')}>
            <Container component="main" maxWidth="lg">
                <Box display="flex" justifyContent="flex-end">
                    <FormControlLabel
                        label={t('ManageBandProfilePage.viewMode').toString()}
                        control={
                            <Switch
                                checked={mode === BandProfileMode.view}
                                onChange={() => handleModeChanges(!(mode === BandProfileMode.view))}
                            />
                        }
                    />
                </Box>
                <Box mt={2}>
                    {
                        mode === BandProfileMode.view
                            ? <BandProfileComponent band={band}/>
                            : renderManageSection()
                    }
                </Box>
            </Container>
        </LayoutWithMenuComponent>
    )
}
