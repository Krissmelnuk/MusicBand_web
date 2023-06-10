import { Query } from '@datorama/akita'
import {AuthState, AuthStore, authStore} from "./auth.store";
import {IdentityModel} from "../../models/identity.model";

/**
 * Provides auth queries
 */
export class AuthQuery extends Query<AuthState> {

    public auth$ = this.select(state => state.auth);

    constructor (protected store: AuthStore) {
        super(store)
    }

    public isAuthorized(): boolean {
        const auth = this.store.getValue().auth;

        if (!auth.accessToken?.length) {
            return false;
        }

        const isExpired = new Date(auth.expiredAt).getUTCDate() < new Date().getUTCDate();

        return !isExpired;
    }

    public getIdentity(): IdentityModel {
        return this.getValue().auth.identity;
    }

    public getToken(): string {
        return this.getValue().auth.accessToken;
    }

    public getFirstName(): string {
        return this.getValue().auth.identity.firstName;
    }

    public getLastName(): string {
        return this.getValue().auth.identity.lastName;
    }

    public getName(): string {
        return this.getFirstName() + ' ' + this.getLastName();
    }

    public getLocale(): string {
        return this.getValue().auth.identity.locale;
    }
}

export const authQuery = new AuthQuery(authStore)
