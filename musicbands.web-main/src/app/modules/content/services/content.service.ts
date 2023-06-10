import {Observable} from "rxjs";
import Axios from "axios-observable";
import {API_URL} from "../../../../env";
import {authHeader} from "../../_common/helpers/authHeader";
import {contentStore, ContentStore} from "../stores/content";
import {ContentModel} from "../models/content.model";
import {UpdateContentModel} from "../models/updateContent.model";
import {CreateContentModel} from "../models/createContent.model";
import {snackService} from "../../_common/services/snack.service";

export class ContentService {

    constructor(private store: ContentStore) {}

    public get(bandId: string, locale: string): Observable<ContentModel[]> {
        return new Observable(observer => {
            Axios.get<ContentModel[]>(`${API_URL}Content?bandId=${bandId}&locale=${locale}`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({content: response.data});
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

    public getAll(bandId: string): Observable<ContentModel[]> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.get<ContentModel[]>(`${API_URL}Content/All?bandId=${bandId}`, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({content: response.data});
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

    public create(model: CreateContentModel): Observable<ContentModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.post<ContentModel>(`${API_URL}Content`, model, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.addContent(response.data);
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

    public update(model: UpdateContentModel): Observable<ContentModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.put<ContentModel>(`${API_URL}Content`, model, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.updateContent(response.data);
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

    public delete(id: string): Observable<ContentModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.delete<ContentModel>(`${API_URL}Content/${id}`, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.deleteContent(id);
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
}

export const contentService = new ContentService(contentStore)
