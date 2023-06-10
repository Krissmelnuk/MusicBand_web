import {MemberRole} from "../enums/memberRole";

export const memberRoles = new Map()
    .set(MemberRole.Singer, 'MemberRole.Singer')
    .set(MemberRole.Guitarist, 'MemberRole.Guitarist')
    .set(MemberRole.Bassist, 'MemberRole.Bassist')
    .set(MemberRole.KeyboardPlayer, 'MemberRole.KeyboardPlayer')
    .set(MemberRole.Drummer, 'MemberRole.Drummer')
    .set(MemberRole.Other, 'MemberRole.Other')