import * as React from "react";
import {Box, Button} from "@mui/material";
import {CreateBandStepProps} from "../createBandStep.props";
import {ManageLinksComponent} from "../../../../../links/components/manageLinks/manageLinks.component";
import {useTranslation} from "react-i18next";

export const LinksStepComponent: React.FC<CreateBandStepProps> = (props: CreateBandStepProps) => {
    const {
        band,
        isOptional,
        skip,
        canGoNext,
        goNext,
        canGoBack,
        goBack
    } = props;

    const {t} = useTranslation();

    return (
        <Box>
            <Box py={5}>
                <ManageLinksComponent bandId={band.id}/>
            </Box>
            <Box display="flex" justifyContent="space-between">
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
                    <Button color="secondary" variant="outlined" onClick={() => goNext()}  disabled={!canGoNext()}>
                        {t('CreateBandPage.next')}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}