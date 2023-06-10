import {Store, StoreConfig} from "@datorama/akita";
import {MemberModel} from "../../models/member.model";

/**
 * Represents members state
 */
export interface MembersState {
    members: MemberModel[];
}

/**
 * Creates initial state
 */
export function createInitialState(): MembersState {
    return {
        members: []
    }
}

/**
 * Provides members states management
 */
@StoreConfig({name: 'members', resettable: true})
export class MembersStore extends Store<MembersState> {
    constructor() {
        super(createInitialState())
    }

    public addMember(member: MemberModel): void {
        const members = [...this.getValue().members, member];
        this.update({members: members});
    }

    public updateMember(member: MemberModel): void {
        const members = this.getValue().members.map(x => x.id === member.id ? member : x);
        this.update({members: members});
    }

    public deleteMember(id: string): void {
        const members = this.getValue().members.filter(x => x.id !== id);
        this.update({members: members});
    }
}

export const membersStore = new MembersStore()