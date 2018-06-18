import { HttpAuthService } from './../api/auth/auth-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreationReservationComponent } from './reservation-creation.component';
import { CreateSessionModel } from './../model/create-session-model';
import { Subscriber } from './../model/subscriber.model';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

import { HttpRoomService } from '../api/room/room-http.service';
import { ReservationModel } from '../model/reservation.model';
import * as moment from 'moment';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation-validation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ValidationReservationComponent extends CreationReservationComponent {

    protected subscribers : Subscriber[] = [];

    private session_id: number;
    private subscriber_id: number;
    private password;

    private status: string;
    private validated: boolean = false;

    private session: any;

    constructor(protected roomService: HttpRoomService, 
                private route: ActivatedRoute,
                private authService: HttpAuthService,
                protected router: Router) {
        super(roomService, router);
    }

    ngOnInit(){
        this.route.params.subscribe(params => {
            this.session_id = +params.session_id;
            this.password = params.password;
            this.subscriber_id = +params.subscriber_id;

            this.status = "Authentification...";

            this.authService.loginClient(this.subscriber_id, this.password)
                            .subscribe(ret => {
                                this.status = "Validation...";
                                this.loadSession();
                                this.validateSession();
                            });
        });
    }
    
    loadSession(){
        this.roomService.consultSession(this.session_id).subscribe(session => {
            this.session = session;
            console.log(session);
            this.myForm = new FormGroup({});

            this.myForm.addControl('idAvailability', new FormControl(0)),
            this.myForm.addControl('startDateTime', new FormControl(session["hour_start"])),
            this.myForm.addControl('subscribers', new FormArray([]));
            this.myForm.addControl('level', new FormControl(session.level));
            let first: boolean = true;
            for (let s of session.subscribers){
                (<FormArray>this.myForm.get('subscribers')).push(new FormGroup({
                    firstname: new FormControl(s.firstname, first ? [Validators.required] : []),
                    lastname: new FormControl(s.lastname, first ? [Validators.required] : []),
                    email:new FormControl(s.email, first ? [Validators.required, this.emailOrEmpty] : [this.emailOrEmpty]),
                    creator:new FormControl(first)
                }));
                first = false;
            }
        });
    }

    protected performSaveSession(formData:any){
        console.log((<FormArray>this.myForm.get('subscribers')).at(0).get('email'));
        //this.roomService.updateSession(formData);
    }

    validateSession(){
        this.roomService.validateSession({"session_id" : +this.session_id, "code":this.password}).subscribe(
            res => {
                this.validated=true;
            },
            err => {
                this.status = "Erreur lors de la validation";
            }
        );
    }
}
