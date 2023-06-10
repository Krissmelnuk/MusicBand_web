import {Observable} from "rxjs";
import {bandsStore, BandsStore} from "../stores/bands";
import {BandModel} from "../models/band.model";
import Axios from "axios-observable";
import {API_URL} from "../../../../env";
import {PageModel} from "../../_common/models/page.model";
import {BandStatus} from "../enums/bandStatus";
import {authHeader} from "../../_common/helpers/authHeader";
import {CreateBandModel} from "../models/createBand.model";
import {UpdateBandModel} from "../models/updateBand.model";
import {snackService} from "../../_common/services/snack.service";

export class BandsService {

    constructor(private store: BandsStore) {}

    public count(): Observable<number> {
        return new Observable(observer => {
            Axios.get<number>(`${API_URL}Bands/Count`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({count: response.data});
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

    public getBandByUrl(url: string): Observable<BandModel> {
        return new Observable(observer => {
            Axios.get<BandModel>(`${API_URL}Bands/Url/${url}`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({band: response.data});
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

    public getBandById(id: string): Observable<BandModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.get<BandModel>(`${API_URL}Bands/${id}`, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({band: response.data});
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

    public selectBands(
        name?: string | null,
        status?: BandStatus | null,
        skip?: number | null,
        take?: number | null): Observable<BandModel[]> {
        return new Observable(observer => {
            let query = '';
            if (name) {
                query = query.length
                    ? query + `&name=${name}`
                    : query + `?name=${name}`;
            }

            if (status) {
                query = query.length
                    ? query + `&status=${status}`
                    : query + `?status=${status}`;
            }

            if (skip) {
                query = query.length
                    ? query + `&skip=${skip}`
                    : query + `?skip=${skip}`;
            }

            if (take) {
                query = query.length
                    ? query + `&take=${take}`
                    : query + `?take=${take}`;
            }

            Axios.get<PageModel<BandModel>>(`${API_URL}Bands${query}`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({bands: response.data.data});
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

    public getRecentBands(amount: number): Observable<PageModel<BandModel>> {
        return new Observable(observer => {
            Axios.get<PageModel<BandModel>>(`${API_URL}Bands/Latest?skip=0&take=${amount}`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({recentBand: response.data.data});
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

    public getPopularBands(amount: number): Observable<PageModel<BandModel>> {
        return new Observable(observer => {
            Axios.get<PageModel<BandModel>>(`${API_URL}Bands/Popular?skip=0&take=${amount}`, null)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({popularBands: response.data.data});
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

    public getMyBands(): Observable<BandModel[]> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.get<BandModel[]>(`${API_URL}Bands/My`, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.update({myBands: response.data});
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

    public createBand(model: CreateBandModel): Observable<BandModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.post<BandModel>(`${API_URL}Bands`, model, config)
                .pipe()
                .subscribe({
                    next: (response) => {
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

    public updateBand(model: UpdateBandModel): Observable<BandModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.put<BandModel>(`${API_URL}Bands`, model, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.updateBand(response.data)
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

    public like(id: string): Observable<void> {
        return new Observable(observer => {
            Axios.post<void>(`${API_URL}Bands/${id}/Like`, null, null)
                .pipe()
                .subscribe({
                    next: () => {
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

    public publish(id: string): Observable<BandModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.patch<BandModel>(`${API_URL}Bands/${id}/Publish`, null, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.updateBand(response.data)
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

    public markAsDraft(id: string): Observable<BandModel> {
        const config = {
            headers: authHeader()
        };

        return new Observable(observer => {
            Axios.patch<BandModel>(`${API_URL}Bands/${id}/Draft`, null, config)
                .pipe()
                .subscribe({
                    next: (response) => {
                        this.store.updateBand(response.data)
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

export const bandsService = new BandsService(bandsStore)
