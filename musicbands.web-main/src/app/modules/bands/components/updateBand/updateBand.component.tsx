import * as React from "react";
import {Box, Button, Card, CardContent} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useTranslation} from "react-i18next";
import {BandModel} from "../../models/band.model";
import {useFacade} from "./updateBand.hooks";
import {LoaderComponent} from "../../../_common/components/loader/loader.component";

export interface UpdateBandComponentProps {
    band: BandModel;
}

export const UpdateBandComponent: React.FC<UpdateBandComponentProps> = (props: UpdateBandComponentProps) => {
    const {
        band,
    } = props;

    const [
        {
            isLoading,
            hasChanges,
            model
        },
        handleChanges,
        handleDiscard,
        handleSubmit
    ] = useFacade(band);

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Box>
            <Card>
                <CardContent>
                    <Box sx={{mt: 1}}>
                        <TextField
                            autoFocus
                            color="secondary"
                            sx={theme => ({
                                background: theme.palette.background.paper
                            })}
                            margin="normal"
                            required
                            fullWidth
                            id="url"
                            label={t('UpdateBandComponent.url')}
                            name="url"
                            value={model.url}
                            onChange={(e) => handleChanges(e.target.name, e.target.value)}
                        />
                        <TextField
                            color="secondary"
                            sx={theme => ({
                                background: theme.palette.background.paper
                            })}
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label={t('UpdateBandComponent.name')}
                            id="name"
                            value={model.name}
                            onChange={(e) => handleChanges(e.target.name, e.target.value)}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={3}>
                        <Box>
                            <Button
                                color="secondary"
                                disabled={isLoading || !hasChanges}
                                variant="outlined"
                                onClick={() => handleDiscard()}>
                                {t('UpdateBandComponent.discard')}
                            </Button>
                        </Box>

                        <Box>
                            <Button
                                color="secondary"
                                disabled={isLoading || !hasChanges}
                                variant="contained"
                                onClick={() => handleSubmit()}>
                                {t('UpdateBandComponent.save')}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}