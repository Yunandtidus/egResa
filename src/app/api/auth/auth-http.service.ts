import { Inject, Injectable, EventEmitter } from '@angular/core';
import { Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

import { HttpApi} from '../http-api.service';

@Injectable()
export class HttpAuthService  {
    constructor(private http: HttpApi) {
    }

    public onLogin: EventEmitter<any> = new EventEmitter<any>();

    login(email: String, password: String): Observable<Response> {
        let o = this.http.post('staff/login', { email: email, password: password }, null);
        o.subscribe(data => {
             localStorage.setItem("token", data["token"]);
             this.onLogin.emit(data);
            });
        return o;
    }
}