import { Injectable, Inject} from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { RoomService} from './room.service';
import { LoggerService} from '../utils/logger.service';

import { RoomModel } from '../model/room.model';

@Injectable()
export class HttpRoomService implements RoomService{
    constructor(private http: Http, @Inject('LoggerService') private loggerService: LoggerService) {
    }

    loadRoom(id: number, onSuccess: (result: any) => any, onError: (error: any) => any): void {

        this.makeRequest('')
            .subscribe(
            this.callbackData(onSuccess),
                // petit hack pour bien garder le this
                onError ? onError : this.handleError.bind(this)
            );
    };

    private makeRequest(path: string): Observable<Response> {
        let params = new URLSearchParams();
        params.set('per_page', '100');
        let url = `/mock/room.json`;
        //let url = `https://api.github.com/orgs/angular`;
        //let url = 'http://api.bureau401.fr/api/schema/getbyid';
        return this.http.get(url, { search: params });
    }

    private callbackData(callback: (res: any) => any): (result: Response) => any {
        return (res: Response) => callback(res.json());
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.loggerService.error(errMsg);
    };
}