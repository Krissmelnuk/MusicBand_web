import {Observable} from "rxjs";
import Axios from "axios-observable";
import {API_URL} from "../../../../env";
import {linksStore, LinksStore} from "../stores/contacts";
import {LinkModel} from "../models/link.model";
import {UpdateLinkModel} from "../models/updateLink.model";
import {authHeader} from "../../_common/helpers/authHeader";
import {CreateLinkModel} from "../models/createLink.model";

export class LinksService {

    constructor(private store: LinksStore) {}

    public get(bandId: string): Observable<LinkModel[]> {
        return new Observable(observer => {
            Axios.get<LinkModel[]>(`${API_URL}Links?bandId=${bandId}`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({links: response.data});
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

    public create(model: CreateLinkModel): Observable<LinkModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.post<LinkModel>(`${API_URL}Links`, model, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.addLink(response.data);
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: error => {
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public update(model: UpdateLinkModel): Observable<LinkModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.put<LinkModel>(`${API_URL}Links`, model, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.updateLink(response.data);
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: error => {
                        observer.error(error);
                        observer.complete();
                    }
                })
        });
    }

    public delete(id: string): Observable<LinkModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.delete<LinkModel>(`${API_URL}Links/${id}`, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.deleteLink(id);
                        observer.next(response.data);
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

export const linksService = new LinksService(linksStore)
