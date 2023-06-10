import * as React from 'react';
import {useState} from 'react'
import {GeneralStepComponent} from "./steps/generalStep/generalStep.component";
import {LinksStepComponent} from "./steps/linksStep/linksStep.component";
import {ContactsStepComponent} from "./steps/contactsStep/contactsStep.component";
import {BandModel} from "../../models/band.model";
import {useNavigate} from "react-router";
import {navigationService} from "../../../_common/services/navigation.service";
import {snackService} from "../../../_common/services/snack.service";
import {ImagesStepComponent} from "./steps/imagesStep/imagesStep.component";
import {ContentStepComponent} from "./steps/contentStep/contentStep.component";

export enum CreateBandSteps {
    General,
    Content,
    Images,
    Links,
    Contacts
}

interface CreateBandPageState {
    band: BandModel;
    currentStep: CreateBandSteps;
}

let context: CreateBandPageState = null;

export function useFacade(): [CreateBandPageState, Function] {
    const navigate = useNavigate();
    const [state, setState] = useState({
        currentStep: CreateBandSteps.General,
        band: null
    } as CreateBandPageState);

    context = state;

    const canGoNext = () => {
        return true;
    }

    const goNext = () => {
        if (state.currentStep === CreateBandSteps.Contacts) {
            snackService.success(null);
            return navigationService.toDashboard(navigate);
        }

        setState(state => ({
            ...state,
            currentStep: state.currentStep + 1
        }))
    }

    const canGgoBack = () => {
        return state.currentStep != CreateBandSteps.General;
    }

    const goBack = () => {
        setState(state => ({
            ...state,
            currentStep: state.currentStep - 1
        }))
    }

    const getSteps = () => {
        return [
            {
                step: CreateBandSteps.General,
                name: 'CreateBandPage.generalStep',
                component: <GeneralStepComponent
                    band={context.band}
                    isOptional={state.band != null}
                    skip={goNext}
                    canGoBack={canGgoBack}
                    canGoNext={canGoNext}
                    goBack={goBack}
                    goNext={(band: BandModel) => {
                        setState(state => ({
                            ...state,
                            band: band
                        }));

                        goNext();
                    }}
                />
            },
            {
                step: CreateBandSteps.Content,
                name: 'CreateBandPage.contentStep',
                component: <ContentStepComponent
                    band={context.band}
                    isOptional={true}
                    skip={goNext}
                    canGoBack={canGgoBack}
                    canGoNext={canGoNext}
                    goBack={goBack}
                    goNext={goNext}
                />
            },
            {
                step: CreateBandSteps.Images,
                name: 'CreateBandPage.imagesStep',
                component: <ImagesStepComponent
                    band={context.band}
                    isOptional={true}
                    skip={goNext}
                    canGoBack={canGgoBack}
                    canGoNext={canGoNext}
                    goBack={goBack}
                    goNext={goNext}
                />
            },
            {
                step: CreateBandSteps.Links,
                name: 'CreateBandPage.linksStep',
                component: <LinksStepComponent
                    band={context.band}
                    isOptional={true}
                    skip={goNext}
                    canGoBack={canGgoBack}
                    canGoNext={canGoNext}
                    goBack={goBack}
                    goNext={goNext}
                />
            },
            {
                step: CreateBandSteps.Contacts,
                name: 'CreateBandPage.contactsStep',
                component: <ContactsStepComponent
                    band={context.band}
                    isOptional={true}
                    skip={goNext}
                    canGoBack={canGgoBack}
                    canGoNext={canGoNext}
                    goBack={goBack}
                    goNext={goNext}
                />
            }
        ]
    }

    return [state, getSteps]
}
