import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

export interface AuthService {

    /**
    * @param email : the user email
    * @param password : the user password
    * @throw error
    */
    auth(email: String, password: String, onSuccess: (result: any) => any, onError: (error: any) => any);
}