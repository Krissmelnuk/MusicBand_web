import { Query } from '@datorama/akita'
import {MembersState, membersStore, MembersStore} from "./members.store";

/**
 * Provides members queries
 */
export class MembersQuery extends Query<MembersState> {
    members$ = this.select(state => state.members);

    constructor (protected store: MembersStore) {
        super(store)
    }
}

export const membersQuery = new MembersQuery(membersStore)
