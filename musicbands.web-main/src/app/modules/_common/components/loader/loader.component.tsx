import React from "react";
import {useTranslation} from "react-i18next";

export const LoaderComponent: React.FC = () => {
    const {t} = useTranslation();

    return (
        <div>
            ...{t('LoaderComponent.placeholder')}
        </div>
    )
}