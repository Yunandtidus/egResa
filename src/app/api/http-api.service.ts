import { Injectable, Inject} from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { environment } from '../../environments/environment';

import * as moment from 'moment';

@Injectable()
export class HttpApi {

    constructor(protected http: Http, protected authHttp: AuthHttp = null) { }

    public post(path: string, params: Object, headers: Headers): Observable<Response> {
        var headers = headers || new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let parameters = new URLSearchParams();
        if (params) {
            parameters.set("request", JSON.stringify(params));
        }

        let url = this.getApiUrl() + path;
        return this.http.post(url, parameters.toString(), { headers: headers }).map(res => res.json());
    }

    public authPost(path: string, params: Object, headers: Headers): Observable<Response> {
        var headers = headers || new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let parameters = new URLSearchParams();
        if (params) {
            parameters.set("request", JSON.stringify(params));
        }

        let url = this.getApiUrl() + path;
        let options = new RequestOptions({ headers: headers, withCredentials: true })
        return this.authHttp.post(url, parameters.toString(), options).map(res => res.json());
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