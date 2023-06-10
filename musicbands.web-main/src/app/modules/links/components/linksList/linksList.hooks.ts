import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {linksQuery} from "../../stores/contacts";
import {LinkModel} from "../../models/link.model";
import {linksService} from "../../services/links.service";

interface LinksListComponentState extends ILoadingState{
    links: LinkModel[];
}

export function useFacade(bandId: string): [LinksListComponentState, Function] {
    const [state, setState] = useState({
        isLoading: true,
        links: []
    } as LinksListComponentState);

    const handleOpenLink = (link: LinkModel) => {
        window.open(link.value, '_blank').focus();
    }

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<LinkModel[]>(linksQuery.links$, links => {
                setState(state => ({
                    ...state,
                    links: links
                }));
            }),
        ];

        linksService.get(bandId).subscribe({
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

    return [state, handleOpenLink]
}