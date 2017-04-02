import { Injectable, Inject} from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AbstractHttpService} from '../abstract-http.service';

import { AuthService} from './auth.service';
import { LoggerService} from '../../utils/logger.service';

@Injectable()
export class HttpAuthService extends AbstractHttpService implements AuthService{
    constructor(http: Http, @Inject('LoggerService') _loggerService: LoggerService) {
        super(http, _loggerService);
    }

    auth(email: String, password: String, onSuccess: (result: any) => any, onError: (error: any) => any): void {

        let authSuccess = function (result: any) {
            localStorage.setItem('id_token', result.token);
            onSuccess(result);
        };
        this.makeRequest('staff/login', { email: email, password: password }, null, authSuccess, onError);
    }
}