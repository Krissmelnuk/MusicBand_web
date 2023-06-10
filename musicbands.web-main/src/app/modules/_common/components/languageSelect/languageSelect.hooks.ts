import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../helpers/onEmit";
import {AuthModel} from "../../../auth/models/auth.model";
import {authQuery} from "../../../auth/stores/auth";
import {authService} from "../../../auth/services/auth.service";

export function useFacade(): [string, Function] {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);

    const handleLanguageSelect = (language) => {
        if (authQuery.isAuthorized()) {
            authService.changeLocale(language)
                .subscribe({
                    next: () => i18n.changeLanguage(language).then(() => setLanguage(language)),
                    error: () => i18n.changeLanguage(language).then(() => setLanguage(language))
                });
        } else {
            i18n.changeLanguage(language).then(() => setLanguage(language));
        }
    }

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<AuthModel>(authQuery.auth$, auth => {
                const locale = auth?.identity?.locale;
                if (locale) {
                    i18n.changeLanguage(locale)
                        .then(() => setLanguage(locale));
                }
            }),
        ];

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, [])

    return [
        language,
        handleLanguageSelect
    ]
}

