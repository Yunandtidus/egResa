import { Router } from '@angular/router';
import { CreateSessionModel } from './../model/create-session-model';
import { Subscriber } from './../model/subscriber.model';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

import { HttpRoomService } from '../api/room/room-http.service';
import { ReservationModel } from '../model/reservation.model';
import * as moment from 'moment';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class CreationReservationComponent implements OnInit {

    private createSessionData:CreateSessionModel;

    public loading: boolean = false;
    
    protected subscribers : Subscriber[] = [];
    myForm: FormGroup;
    levels = [
        {value:1, label:"Débutant"},
        {value:2, label:"Confirmé"},
        {value:3, label:"Expert"}
    ];

    validable: boolean = false;
        
    constructor( protected roomService: HttpRoomService, protected router: Router ) {
        this.createSessionData = this.roomService.createSessionData;
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            'idAvailability':new FormControl(this.createSessionData.idAvailability),
            'startDateTime':new FormControl(this.createSessionData.startDateTime),
            'level': new FormControl(this.levels[0].value),
            'subscribers': new FormArray([
                new FormGroup({
                   firstname: new FormControl('',[Validators.required]),
                   lastname: new FormControl('',[Validators.required]),
                   email:new FormControl('',[Validators.required,this.emailOrEmpty]),
                   creator:new FormControl(true)
                }),
                new FormGroup({
                   firstname: new FormControl(''),
                   lastname: new FormControl(''),
                   email:new FormControl('',[this.emailOrEmpty]),
                   creator:new FormControl(false)
                })
            ]),
            'discounts': new FormArray([])
        });
    }
    
    protected onSubmit(){
        this.myForm.markAsDirty();
        if (this.myForm.valid){
            let formData = this.myForm.getRawValue();
            formData.numberOfPlayers = (<FormArray>this.myForm.get('subscribers')).length;
            this.performSaveSession(formData);
        } else {
            alert("Formulaire invalide" + this.myForm.errors);
        }
    }

    protected performSaveSession(formData:any){
        this.loading = true;
        this.roomService.createSession(formData).subscribe(
            res => {
                this.loading = false;
                this.router.navigateByUrl('/reservation/creation_ok');
            },
            err => {
            }
        );;
    }

    protected removePlayer(){
        (<FormArray>this.myForm.get('subscribers')).removeAt((<FormArray>this.myForm.get('subscribers')).length - 1);
    }

    protected addPlayer(){
        (<FormArray>this.myForm.get('subscribers')).push( new FormGroup({
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            email: new FormControl('',[this.emailOrEmpty]),
            creator:new FormControl(false)
         }))
    }

    emailOrEmpty(control: FormControl) {
        return control.value ? Validators.email(control) : null;
    }
}
