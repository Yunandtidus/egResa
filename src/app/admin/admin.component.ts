import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../api/auth/auth.service';

import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent{

    errorMessage = "";

    public loginForm = this.fb.group({
        email: ["@bureau401.fr", Validators.required],
        password: ["", Validators.required]
    });

    constructor(
        public fb: FormBuilder,
        private router : Router,
        @Inject("AuthService") private authService: AuthService
    ) { }

    doLogin(event) {
        let thisHelper: AdminComponent = this;
        this.authService.auth(this.loginForm.value.email, this.loginForm.value.password,
            function onSuccess() { thisHelper.router.navigateByUrl('/home'); },
            function onError() { thisHelper.errorMessage = "Utilisateur ou mot de passe invalide."; });
        return false;
    }
  
}