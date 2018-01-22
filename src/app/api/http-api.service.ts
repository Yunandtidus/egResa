import { Injectable, Inject} from '@angular/core';


import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

@Injectable()
export class HttpApi {

    constructor(public http: HttpClient) { }

    public post(path: string, params: Object, headers: HttpHeaders) {
        var headers = headers || new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');        
        let parameters = new HttpParams();
        if (params) {
            parameters.set("request", JSON.stringify(params));
        }
        console.log(params);

        let url = this.getApiUrl() + path;
        return this.http.post(
            url,
            {request:JSON.stringify(params)},
              { headers: headers });
    }

    public authPost(path: string, params: Object, headers: HttpHeaders) {
        var headers = headers || new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let parameters = new URLSearchParams();
        if (params) {
            parameters.set("request", JSON.stringify(params));
        }

        let url = this.getApiUrl() + path;
        let options = ({ headers: headers, withCredentials: true })
        return this.http.post(url, parameters.toString(), options);
    }

    protected getApiUrl(): string {
        return environment.apiUrl + "api/";
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
    };
}