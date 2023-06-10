import {LayoutComponent} from "../../../_common/components/layout/layout.component";
import {useFacade} from "./signIn.hooks";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React from "react";
import {useTranslation} from "react-i18next";
import {MenuItemType} from "../../../_common/enums/menuItemType";

export const SignInPage: React.FC = () => {
    const [
        {
            isLoading,
            model
        },
        handleChanges,
        handleSubmit,
        handleSignUp,
        handleForgotPassword
    ] = useFacade();

    const {t} = useTranslation();

    return (
        <LayoutComponent menuItem={MenuItemType.Other} title={t('SignInPage.title')}>
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
                            {t('SignInPage.signIn')}
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
                                label={t('SignInPage.email')}
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
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t('SignInPage.password')}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={model.password}
                                onChange={(event) => handleChanges(event.target.name, event.target.value)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="secondary"
                                        value="remember"
                                    />
                                }
                                label={t('SignInPage.rememberMe').toString()}
                            />
                            <Button
                                disabled={isLoading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                {t('SignInPage.signIn')}
                            </Button>
                            {
                                !isLoading &&
                                <Grid container>
                                    <Grid item xs>
                                        <Link color="secondary" onClick={() => handleForgotPassword()} variant="body2">
                                            {t('SignInPage.forgotPassword')}
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link color="secondary" onClick={() => handleSignUp()} variant="body2">
                                            {t('SignInPage.dontHaveAccount')}
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