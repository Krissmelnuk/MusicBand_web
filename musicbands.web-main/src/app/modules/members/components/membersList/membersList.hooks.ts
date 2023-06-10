import {ILoadingState} from "../../../_common/states/loadingState";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../../_common/helpers/onEmit";
import {MemberModel} from "../../models/member.model";
import {membersQuery} from "../../stores/members";
import {membersService} from "../../services/members.service";

interface MembersListComponentState extends ILoadingState{
    members: MemberModel[];
}

export function useFacade(bandId: string): [MembersListComponentState] {
    const [state, setState] = useState({
        isLoading: true,
        members: []
    } as MembersListComponentState);

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<MemberModel[]>(membersQuery.members$, members => {
                setState(state => ({
                    ...state,
                    members: members
                }));
            }),
        ];

        membersService.get(bandId).subscribe({
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