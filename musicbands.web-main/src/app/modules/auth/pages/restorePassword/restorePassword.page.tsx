import {LayoutComponent} from "../../../_common/components/layout/layout.component";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React from "react";
import {useTranslation} from "react-i18next";
import {MenuItemType} from "../../../_common/enums/menuItemType";
import {useSearchParams} from "react-router-dom";
import {useFacade} from "./restorePassword.hooks";

export const RestorePasswordPage: React.FC = () => {
    const [params] = useSearchParams();
    const token = params.get('token');

    const [
        {
            isLoading,
            model
        },
        handleChanges,
        handleSubmit,
        handleSignIn,
    ] = useFacade(token);

    const {t} = useTranslation();

    return (
        <LayoutComponent menuItem={MenuItemType.Other} title={t('RestorePasswordPage.title')}>
            <Box mt={5}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {t('RestorePasswordPage.restorePassword')}
                        </Typography>
                        <Box component="form" onSubmit={(event) => handleSubmit(event)} noValidate sx={{mt: 1}}>
                            <TextField
                                color="secondary"
                                sx={theme => ({
                                    background: theme.palette.background.paper
                                })}
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={t('RestorePasswordPage.email')}
                                name="email"
                                autoComplete="email"
                                value={model.email}
                                onChange={(event) => handleChanges(event.target.name, event.target.value)}
                            />
                            <TextField
                                color="secondary"
                                sx={theme => ({
                                    background: theme.palette.background.paper
                                })}
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                id="newPassword"
                                label={t('RestorePasswordPage.newPassword')}
                                name="newPassword"
                                autoComplete="newPassword"
                                value={model.newPassword}
                                onChange={(event) => handleChanges(event.target.name, event.target.value)}
                            />
                            <Button
                                disabled={isLoading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                {t('RestorePasswordPage.resetPassword')}
                            </Button>
                            {
                                !isLoading &&
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link color="secondary" onClick={() => handleSignIn()} variant="body2">
                                            {t('RestorePasswordPage.rememberPassword')}
                                        </Link>
                                    </Grid>
                                </Grid>
                            }
                        </Box>
                    </Box>
                </Container>
            </Box>
        </LayoutComponent>
    )
}