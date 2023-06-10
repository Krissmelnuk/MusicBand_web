import {BandModel} from "../../../models/band.model";

export interface CreateBandStepProps {
    band: BandModel;
    isOptional: boolean;
    skip: Function;
    canGoNext: Function;
    goNext: Function;
    canGoBack: Function;
    goBack: Function;
}