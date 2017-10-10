import { Inject, Injectable, EventEmitter } from '@angular/core';
import { Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {JwtHelper} from 'angular2-jwt';
import 'rxjs';

import { HttpApi} from '../http-api.service';

@Injectable()
export class HttpAuthService  {
    private jwtHelper: JwtHelper = new JwtHelper();
    private admin: boolean = false;

    constructor(private http: HttpApi) {
        let token = localStorage.getItem("token");
        if (token != null){
            this.admin = !this.jwtHelper.isTokenExpired(token);
        }
    }

    public onLogin: EventEmitter<any> = new EventEmitter<any>();

    loginAdmin(email: String, password: String): Observable<Response> {
        let o = this.http.post('staff/login', { email: email, password: password }, null);
        o.subscribe(data => {
             localStorage.setItem("token", data["token"]);
             this.admin = true;
             this.onLogin.emit(data);
            });
        return o;
    }

    isAdmin(){
        return this.admin;
    }
}