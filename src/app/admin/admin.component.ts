import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { HttpAuthService } from '../api/auth/auth-http.service';

import {Router} from '@angular/router';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

    errorMessage = "";

    email = "@bureau401.fr";

    constructor(
        private router : Router,
        private authService: HttpAuthService
    ) { }
    
    ngOnInit(): void {
        this.authService.onLogin.subscribe(
            data => (this.router.navigateByUrl('/home')), 
            error => this.errorMessage = "Utilisateur ou mot de passe invalide."
        );
    }

    /*
    doLogin(event) {
        let thisHelper: AdminComponent = this;
        this.authService.auth(this.loginForm.value.email, this.loginForm.value.password,
            function onSuccess() { thisHelper.router.navigateByUrl('/home'); },
            function onError() { thisHelper.errorMessage = "Utilisateur ou mot de passe invalide."; });
        return false;
    }*/
    login(f: NgForm) {
        console.log(f);
        console.log(f.value);
        this.authService.login(f.value.email, f.value.password);
        
        /*
            function onSuccess() { thisHelper.router.navigateByUrl('/home'); },
            function onError() { thisHelper.errorMessage = "Utilisateur ou mot de passe invalide."; });
            */
        return false;
    }
  
}