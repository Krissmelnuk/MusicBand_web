import * as React from "react";
import {Box, Button} from "@mui/material";
import {CreateBandStepProps} from "../createBandStep.props";
import TextField from "@mui/material/TextField";
import {useFacade} from "./generalStep.hooks";
import {LoaderComponent} from "../../../../../_common/components/loader/loader.component";
import {useTranslation} from "react-i18next";

export const GeneralStepComponent: React.FC<CreateBandStepProps> = (props: CreateBandStepProps) => {
    const {
        band,
        isOptional,
        skip,
        canGoNext,
        goNext,
        canGoBack,
        goBack
    } = props;

    const [
        {
            isLoading,
            model
        },
        handleChanges,
        handleSubmit
    ] = useFacade(band);

    const {t} = useTranslation();

    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Box>
            <Box>
                <Box component="form" noValidate sx={{mt: 1}}>
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
                        label={t('CreateBandPage.url')}
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
                        label={t('CreateBandPage.name')}
                        id="name"
                        value={model.name}
                        onChange={(e) => handleChanges(e.target.name, e.target.value)}
                    />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={5}>
                <Box>
                    {
                        canGoBack() &&
                        <Button color="secondary" variant="outlined" onClick={() => goBack()}>
                            {t('CreateBandPage.back')}
                        </Button>
                    }
                </Box>
                <Box display="flex">
                    {
                        isOptional &&
                        <Box mr={1}>
                            <Button color="secondary" onClick={() => skip()}>
                                {t('CreateBandPage.skip')}
                            </Button>
                        </Box>
                    }
                    <Button color="secondary" variant="outlined" onClick={() => handleSubmit(goNext)}  disabled={!canGoNext()}>
                        {t('CreateBandPage.next')}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}