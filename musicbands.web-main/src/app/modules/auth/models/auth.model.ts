import {IdentityModel} from "./identity.model";

export interface AuthModel
{
    accessToken: string;
    expiredAt: Date;
    identity: IdentityModel;
}