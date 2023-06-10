import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {LayoutComponent} from "../../../_common/components/layout/layout.component";
import {useFacade} from "./createBand.hooks";
import {Box, Container} from "@mui/material";
import {useTranslation} from "react-i18next";
import {MenuItemType} from "../../../_common/enums/menuItemType";

export const CreateBandPage: React.FC = () => {
    const [
        {
            currentStep
        },
        getSteps
    ] = useFacade()

    const {t} = useTranslation();

    const steps = getSteps();

    return (
        <LayoutComponent  menuItem={MenuItemType.Other} title={t('CreateBandPage.title')}>
            <Box sx={{ width: '100%' }} py={5}>
                <Stepper activeStep={currentStep} alternativeLabel>
                    {
                        steps.map((step) => {
                            return (
                                <Step key={step.step}>
                                    <StepLabel>{t(step.name)}</StepLabel>
                                </Step>
                            )
                        })
                    }
                </Stepper>
            </Box>
            <Container component="main" maxWidth="md">
                {steps[currentStep].component}
            </Container>
        </LayoutComponent>
    )
}
