import {Subject} from "rxjs";
import {SnackMessageModel} from "../models/snackMessage.model";

export class SnackService {
    public onMessage = new Subject<SnackMessageModel>();

    public success(messages: string[]): void {
        this.onMessage.next({
            messages: messages ?? ['Success!'],
            type: 'success'
        });
    }

    public error(error: any): void {
        this.onMessage.next({
            messages: error?.response?.data?.messages ?? ['Unknown error'],
            type: 'error'
        });
    }
}

export const snackService = new SnackService();