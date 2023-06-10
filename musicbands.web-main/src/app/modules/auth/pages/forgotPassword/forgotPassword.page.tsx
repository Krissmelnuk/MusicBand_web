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
import {useFacade} from "./forgotPassword.hooks";
import {useTranslation} from "react-i18next";
import {MenuItemType} from "../../../_common/enums/menuItemType";

export const ForgotPasswordPage: React.FC = () => {
    const [
        {
            isLoading,
            model
        },
        handleChanges,
        handleSubmit,
        handleSignIn,
    ] = useFacade();

    const {t} = useTranslation();

    return (
        <LayoutComponent menuItem={MenuItemType.Other} title={t('ForgotPasswordPage.title')}>
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
                            {t('ForgotPasswordPage.forgotPassword')}
                        </Typography>
                        <Box p={2}>
                            {t('ForgotPasswordPage.description')}
                        </Box>
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
                                label={t('ForgotPasswordPage.email')}
                                name="email"
                                autoComplete="email"
                                value={model.email}
                                onChange={(event) => handleChanges(event.target.name, event.target.value)}
                            />
                            <Button
                                disabled={isLoading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                {t('ForgotPasswordPage.resetPassword')}
                            </Button>
                            {
                                !isLoading &&
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link color="secondary" onClick={() => handleSignIn()} variant="body2">
                                            {t('ForgotPasswordPage.rememberPassword')}
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