import {Observable} from "rxjs";
import Axios from "axios-observable";
import {API_URL} from "../../../../env";
import {membersStore, MembersStore} from "../stores/members";
import {MemberModel} from "../models/member.model";

export class MembersService {

    constructor(private store: MembersStore) {}

    public get(bandId: string): Observable<MemberModel[]> {
        return new Observable(observer => {
            Axios.get<MemberModel[]>(`${API_URL}Members?bandId=${bandId}`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({members: response.data});
                        observer.next();
                        observer.complete();
                    },
                    error: error => {
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }
}

export const membersService = new MembersService(membersStore)