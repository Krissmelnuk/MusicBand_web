import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {en} from "./translate/en";
import {ua} from "./translate/ua";

const resources = {
    en: en,
    ua: ua
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ua",
        interpolation: {
            escapeValue: false
        }
    }).then();

export default i18n;