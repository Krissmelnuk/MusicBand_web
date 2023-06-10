import {Observable} from "rxjs";
import Axios from "axios-observable";
import {IDENTITY_API_URL} from "../../../../env";
import {ForgotPasswordModel} from "../models/forgotPassword.model";
import {SignInModel} from "../models/signIn.model";
import {authStore, AuthStore} from "../stores/auth";
import {AuthModel} from "../models/auth.model";
import {SignUpModel} from "../models/signUp.model";
import {ChangePasswordModel} from "../models/changePassword.model";
import {authHeader} from "../../_common/helpers/authHeader";
import {snackService} from "../../_common/services/snack.service";
import {IdentityModel} from "../models/identity.model";
import {UpdateIdentityModel} from "../models/updateIdentity.model";
import {RestorePasswordModel} from "../models/restorePassword.model";

export class AuthService {

    constructor(private store: AuthStore) {}

    public updateIdentity(model: UpdateIdentityModel): Observable<IdentityModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.put<IdentityModel>(`${IDENTITY_API_URL}Identity`, model, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.updateIdentity(response.data)
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: error => {
                        snackService.error(error);
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public changeLocale(locale: string): Observable<IdentityModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.patch<IdentityModel>(`${IDENTITY_API_URL}Identity/Locale?locale=${locale}`, null, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.updateIdentity(response.data)
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: error => {
                        snackService.error(error);
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public signIn(model: SignInModel): Observable<AuthModel> {
        return new Observable(observer => {
            Axios.post<AuthModel>(`${IDENTITY_API_URL}Identity/SignIn`, model)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({
                            auth: response.data
                        })
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: error => {
                        snackService.error(error);
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public signOut(): void {
        authStore.reset();
    }

    public signUp(model: SignUpModel): Observable<AuthModel> {
        return new Observable(observer => {
            Axios.post<AuthModel>(`${IDENTITY_API_URL}Identity/SignUp`, model)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({
                            auth: response.data
                        })
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: error => {
                        snackService.error(error);
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public forgotPassword(model: ForgotPasswordModel): Observable<void> {
        return new Observable(observer => {
            Axios.post<void>(`${IDENTITY_API_URL}Identity/Password/Forgot`, model)
                .pipe()
                .subscribe({
                    next: () => {
                        observer.next();
                        observer.complete();
                    },
                    error: error => {
                        snackService.error(error);
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public changePassword(model: ChangePasswordModel): Observable<void> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.post<void>(`${IDENTITY_API_URL}Identity/Password/Change`, model, config)
                .pipe()
                .subscribe({
                    next: () => {
                        observer.next();
                        observer.complete();
                    },
                    error: error => {
                        snackService.error(error);
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public restorePassword(model: RestorePasswordModel): Observable<void> {
        return new Observable(observer => {
            Axios.post<void>(`${IDENTITY_API_URL}Identity/Password/Restore`, model, null)
                .pipe()
                .subscribe({
                    next: () => {
                        observer.next();
                        observer.complete();
                    },
                    error: error => {
                        snackService.error(error);
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }
}

export const authService = new AuthService(authStore)