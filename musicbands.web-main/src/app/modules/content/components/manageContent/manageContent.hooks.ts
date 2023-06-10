import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {ContentModel} from "../../models/content.model";
import {contentQuery} from "../../stores/content";
import {contentService} from "../../services/content.service";

interface ManageComponentState extends ILoadingState{
    content: ContentModel[];
}

export function useFacade(bandId: string): [ManageComponentState] {
    const [state, setState] = useState({
        isLoading: true,
        content: []
    } as ManageComponentState);

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<ContentModel[]>(contentQuery.content$, content => {
                setState(state => ({
                    ...state,
                    content: content
                }));
            }),
        ];

        contentService.getAll(bandId).subscribe({
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
    }, [bandId]);

    return [state]
}