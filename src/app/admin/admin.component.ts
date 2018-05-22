import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { HttpAuthService } from '../api/auth/auth-http.service';

import {Router} from '@angular/router';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy{
    ngOnDestroy(): void {
        this.authService.onLogin.unsubscribe();
    }

    errorMessage = "";
    email = "@bureau401.fr";

    constructor(private router : Router, private authService: HttpAuthService) {}
    
    ngOnInit(): void {
        this.authService.onLogin.subscribe(
            data => (this.router.navigateByUrl('/home')), 
            error => this.errorMessage = "Utilisateur ou mot de passe invalide."
        );
    }

    login(f: NgForm) {
        this.authService.loginAdmin(f.value.email, f.value.password);
        return false;
    }
}