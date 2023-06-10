import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {useFacade} from "./changePassword.hooks";
import Typography from "@mui/material/Typography";

export const ChangePasswordComponent: React.FC = () => {
    const [
        {
            model,
            isLoading
        },
        handleChanges,
        handleSubmit
    ] = useFacade();
    const {t} = useTranslation();

    return (
        <Box sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                        {t('ChangePasswordComponent.changePassword')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="oldPassword"
                        color="secondary"
                        label={t('ChangePasswordComponent.oldPassword')}
                        type="password"
                        id="oldPassword"
                        value={model.oldPassword}
                        onChange={(event) => handleChanges(event.target.name, event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{mt: 2}}
                        required
                        fullWidth
                        color="secondary"
                        name="newPassword"
                        label={t('ChangePasswordComponent.newPassword')}
                        type="password"
                        id="newPassword"
                        autoComplete="new-password"
                        value={model.newPassword}
                        onChange={(event) => handleChanges(event.target.name, event.target.value)}
                    />
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={4}>
                <Box>
                    <Button
                        fullWidth
                        color="secondary"
                        disabled={isLoading}
                        variant="outlined"
                        onClick={() => handleSubmit()}
                        sx={{mt: 3, mb: 3}}
                    >
                        {t('ChangePasswordComponent.submit')}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}