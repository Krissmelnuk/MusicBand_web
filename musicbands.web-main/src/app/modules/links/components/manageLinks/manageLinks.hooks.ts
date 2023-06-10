import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {linksQuery} from "../../stores/contacts";
import {LinkModel} from "../../models/link.model";
import {linksService} from "../../services/links.service";

interface ManageLinksComponentState extends ILoadingState{
    links: LinkModel[];
}

export function useFacade(bandId: string): [ManageLinksComponentState, Function] {
    const [state, setState] = useState({
        isLoading: true,
        links: []
    } as ManageLinksComponentState);

    const handleDelete = (link) => {
        linksService.delete(link.id).subscribe({
            next: () => {},
            error: () => {}
        });
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

    return [state, handleDelete]
}