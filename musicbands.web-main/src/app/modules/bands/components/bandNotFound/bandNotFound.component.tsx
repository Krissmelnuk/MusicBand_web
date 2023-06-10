import React from "react";
import {useTranslation} from "react-i18next";

export const BandNotFoundComponent: React.FC = () => {
    const {t} = useTranslation();

    return (
        <div>
            {t('BandNotFoundComponent.placeholder')}
        </div>
    )
}