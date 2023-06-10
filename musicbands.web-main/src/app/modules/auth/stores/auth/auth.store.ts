import {Store, StoreConfig} from "@datorama/akita";
import {AuthModel} from "../../models/auth.model";
import {IdentityModel} from "../../models/identity.model";

/**
 * Represents auth state
 */
export interface AuthState {
    auth: AuthModel;
}

/**
 * Creates initial state
 */
export function createInitialState (): AuthState {
    return {
        auth: {
            accessToken: '',
            expiredAt: new Date(),
            identity: {
                firstName: '',
                lastName: '',
                locale: '',
                email: ''
            }
        }
    }
}

/**
 * Provides auth states management
 */
@StoreConfig({ name: 'auth', resettable: true })
export class AuthStore extends Store<AuthState> {
    constructor () {
        super(createInitialState())
    }

    public updateIdentity(identity: IdentityModel): void {
        const auth = Object.assign({}, this.getValue().auth)

        auth.identity = identity;

        this.update({
            auth: auth
        })
    }

    public reset(): void {
        this.update({
            auth: {
                accessToken: '',
                expiredAt: new Date(),
                identity: {
                    firstName: '',
                    lastName: '',
                    locale: '',
                    email: ''
                }
            }
        })
    }
}

export const authStore = new AuthStore()