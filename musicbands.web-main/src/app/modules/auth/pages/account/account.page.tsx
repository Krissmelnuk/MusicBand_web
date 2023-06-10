import {LayoutComponent} from "../../../_common/components/layout/layout.component";
import React from "react";
import {useTranslation} from "react-i18next";
import {Card, CardContent, Container, Grid} from "@mui/material";
import {ChangePasswordComponent} from "../../components/changePassword/changePassword.component";
import {UpdateIdentityComponent} from "../../components/updateIdentity/updateIdentity.component";
import {MenuItemType} from "../../../_common/enums/menuItemType";

export const AccountPage: React.FC = () => {
    const {t} = useTranslation();

    return (
        <LayoutComponent menuItem={MenuItemType.Other} title={t('AccountPage.title')}>
            <Container component="main" maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item md={7} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <UpdateIdentityComponent/>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <ChangePasswordComponent/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </LayoutComponent>
    )
}