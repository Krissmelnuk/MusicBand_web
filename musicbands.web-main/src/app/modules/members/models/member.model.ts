import {MemberDetailsModel} from "./memberDetails.model";
import {MemberRole} from "../enums/memberRole";

export interface MemberModel {
    id: string;
    name: string;
    avatar: string;
    role: MemberRole;
    details: MemberDetailsModel[];
}