import { Injectable, Inject} from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LoggerService} from '../utils/logger.service';

@Injectable()
export class AbstractHttpService {

    constructor(protected http : Http, @Inject('LoggerService') protected loggerService: LoggerService) { }

    protected makeRequest(path: string, params: Object, headers: Headers,
            onSuccess: (result: any) => any, onError: (error: any) => any): void {
        var headers = headers || new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let parameters = new URLSearchParams();
        if (params) {
            parameters.set("request", JSON.stringify(params));
        }

        let url = 'http://api.bureau401.fr/api/' + path;
        this.http.post(url, parameters.toString(), { headers: headers })
            .subscribe(
            this.callbackData(onSuccess),
            // petit hack pour bien garder le this
            onError ? onError : this.handleError.bind(this)
        );
    }

    protected callbackData(callback: (res: any) => any): (result: Response) => any {
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