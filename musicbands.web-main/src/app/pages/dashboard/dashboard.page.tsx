import React from "react";
import {LayoutComponent} from "../../modules/_common/components/layout/layout.component";
import {MyBandsComponent} from "../../modules/bands/components/myBands/myBands.component";
import {useTranslation} from "react-i18next";
import {Container} from "@mui/material";
import {MenuItemType} from "../../modules/_common/enums/menuItemType";

export const DashboardPage: React.FC = () => {
    const {t} = useTranslation();

    return (
        <LayoutComponent title={t('DashboardPage.title')}  menuItem={MenuItemType.Dashboard}>
            <Container component="main" maxWidth="lg">
                <MyBandsComponent/>
            </Container>
        </LayoutComponent>
    )
}