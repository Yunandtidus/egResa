import { HttpApi } from './../http-api.service';
import { HttpClient } from '@angular/common/http';

import { Inject, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';



@Injectable()
export class HttpAuthService  {  
    private admin: boolean = false;

    constructor(private http: HttpClient, private HttpApi:HttpApi ) {
       
    }

    public onLogin: EventEmitter<any> = new EventEmitter<any>();

    loginAdmin(email: String, password: String) {
        let o = this.HttpApi.post('staff/login', {email:email,password:password},null );
        o.subscribe(data => {
             localStorage.setItem("token", data["token"]);
             this.admin = true;
             this.onLogin.emit(data);
            });
        return o;
    }

    loginClient(subscriberId: number, password: String) {
        let o = this.http.post('login', { id: subscriberId, password: password } );
        o.subscribe(data => {
             localStorage.setItem("token", data["token"]);
             this.admin = false;
            });
        return o;
    }

    isAdmin(){
        return this.admin;
    }
}