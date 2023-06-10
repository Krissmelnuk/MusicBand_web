import {ImageModel} from "../models/image.model";
import {API_URL} from "../../../../env";
import {Observable} from "rxjs";
import Axios from "axios-observable";
import {imagesStore, ImagesStore} from "../stores/images";
import {authHeader} from "../../_common/helpers/authHeader";
import {ImageType} from "../enums/image.type";

export class ImagesService {

    constructor(private store: ImagesStore) {}

    public downloadLink(image: ImageModel | string): string {
        const imageKey = (<ImageModel>image).key ?? (<string>image);

        const key = imageKey.replace('/', '%2F');

        return `${API_URL}Images/${key}`;
    }

    public getBandImages(bandId: string): Observable<ImageModel[]> {
        return new Observable(observer => {
            Axios.get<ImageModel[]>(`${API_URL}Images?bandId=${bandId}`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({images: response.data});
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

    public upload(file: File, bandId: string, type: ImageType): Observable<ImageModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            const formData = new FormData();
            formData.append('file', file);

            Axios.post(`${API_URL}Images?bandId=${bandId}&type=${type}`, formData, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.addImage(response.data);
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: (error) => {
                        observer.error(error);
                        observer.complete();
                    }
                });
        });
    }

    public delete(id: string): Observable<ImageModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.delete(`${API_URL}Images/${id}`, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.deleteImage(id);
                        observer.next(response.data);
                        observer.complete();
                    },
                    error: (error) => {
                        observer.error(error);
                        observer.complete();
                    }
                });
        });
    }
}

export const imagesService = new ImagesService(imagesStore);