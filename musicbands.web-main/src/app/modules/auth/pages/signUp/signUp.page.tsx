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
import {useFacade} from "./signUp.hooks";
import {useTranslation} from "react-i18next";
import {MenuItemType} from "../../../_common/enums/menuItemType";

export const SignUpPage: React.FC = () => {
    const [
        {
            isLoading,
            model
        },
        handleChanges,
        handleSubmit,
        handleSignIn
    ] = useFacade();

    const {t} = useTranslation();

    return (
        <LayoutComponent menuItem={MenuItemType.Other} title={t('SignUpPage.title')}>
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
                            {t('SignUpPage.signUp')}
                        </Typography>
                        <Box component="form" onSubmit={(event) => handleSubmit(event)} noValidate sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        color="secondary"
                                        sx={theme => ({
                                            background: theme.palette.background.paper
                                        })}
                                        autoFocus
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label={t('SignUpPage.firstName')}
                                        value={model.firstName}
                                        onChange={(event) => handleChanges(event.target.name, event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        color="secondary"
                                        sx={theme => ({
                                            background: theme.palette.background.paper
                                        })}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label={t('SignUpPage.lastName')}
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={model.lastName}
                                        onChange={(event) => handleChanges(event.target.name, event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        color="secondary"
                                        sx={theme => ({
                                            background: theme.palette.background.paper
                                        })}
                                        required
                                        fullWidth
                                        id="email"
                                        label={t('SignUpPage.email')}
                                        name="email"
                                        autoComplete="email"
                                        value={model.email}
                                        onChange={(event) => handleChanges(event.target.name, event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        color="secondary"
                                        sx={theme => ({
                                            background: theme.palette.background.paper
                                        })}
                                        required
                                        fullWidth
                                        name="password"
                                        label={t('SignUpPage.password')}
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={model.password}
                                        onChange={(event) => handleChanges(event.target.name, event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                disabled={isLoading}
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                {t('SignUpPage.signUp')}
                            </Button>
                            {
                                !isLoading &&
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link color="secondary" onClick={() => handleSignIn()} variant="body2">
                                            {t('SignUpPage.hasAccount')}
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