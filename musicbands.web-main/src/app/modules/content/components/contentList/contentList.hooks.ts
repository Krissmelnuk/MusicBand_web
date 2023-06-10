import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {ContentModel} from "../../models/content.model";
import {contentQuery} from "../../stores/content";
import {contentService} from "../../services/content.service";
import {useTranslation} from "react-i18next";

interface ContentListComponentState extends ILoadingState{
    content: ContentModel[];
}

export function useFacade(bandId: string): [ContentListComponentState] {
    const [state, setState] = useState({
        isLoading: true,
        content: []
    } as ContentListComponentState);

    const { i18n } = useTranslation();

    const locale = i18n.language;

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<ContentModel[]>(contentQuery.content$, content => {
                setState(state => ({
                    ...state,
                    content: content
                }));
            }),
        ];

        contentService.get(bandId, locale).subscribe({
            next: () => setState(state => ({
                ...state,
                isLoading: false
            })),
            error: () => setState(state => ({
                ...state,
                isLoading: false
            }))
        });

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, [bandId, locale]);

    return [state]
}