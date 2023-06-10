import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import {useFacade} from "./updateIdentity.hooks";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export const UpdateIdentityComponent: React.FC = () => {
    const [
        {
            model,
            isLoading,
            hasChanges
        },
        handleChanges,
        handleDiscard,
        handleSubmit
    ] = useFacade();
    const {t} = useTranslation();

    return (
        <Box sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                        {t('UpdateIdentityComponent.updateIdentity')}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoFocus
                        color="secondary"
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label={t('UpdateIdentityComponent.firstName')}
                        value={model.firstName}
                        onChange={(event) => handleChanges(event.target.name, event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        color="secondary"
                        label={t('UpdateIdentityComponent.lastName')}
                        name="lastName"
                        autoComplete="family-name"
                        value={model.lastName}
                        onChange={(event) => handleChanges(event.target.name, event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormControl
                        fullWidth
                        color="secondary"
                        margin="normal">
                        <InputLabel>{t('UpdateIdentityComponent.locale')}</InputLabel>
                        <Select
                            id="type"
                            fullWidth
                            color="secondary"
                            label={t('UpdateIdentityComponent.locale')}
                            value={model.locale}
                            name="locale"
                            onChange={(event) => handleChanges(event.target.name, event.target.value)}
                        >
                            <MenuItem value="en">EN</MenuItem>
                            <MenuItem value="ua">UA</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Box display="flex" justifyContent={"space-between"} mt={3}>
                <Box>
                    <Button
                        fullWidth
                        color="secondary"
                        disabled={!hasChanges || isLoading}
                        onClick={() => handleDiscard()}
                        sx={{mt: 3, mb: 3}}
                    >
                        {t('UpdateIdentityComponent.discard')}
                    </Button>
                </Box>
                <Box>
                    <Button
                        fullWidth
                        color="secondary"
                        disabled={isLoading}
                        variant="outlined"
                        onClick={() => handleSubmit()}
                        sx={{mt: 3, mb: 3}}
                    >
                        {t('UpdateIdentityComponent.submit')}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}