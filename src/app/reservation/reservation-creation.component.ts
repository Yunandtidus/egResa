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
    
    protected subscribers : Subscriber[] = [];
    myForm: FormGroup;
    levels = [
        {value:1, label:"Débutant"},
        {value:2, label:"Confirmé"},
        {value:3, label:"Expert"}
    ];

    validable: boolean = false;
        
    constructor( protected roomService: HttpRoomService) {
        this.createSessionData = this.roomService.createSessionData;
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            'idAvailability':new FormControl(this.createSessionData.idAvailability),
            'startDateTime':new FormControl(this.createSessionData.startDateTime),
            'level': new FormControl(this.levels[0].value),
            'subscribers': new FormArray([
                new FormGroup({
                   firstname: new FormControl('Bruno',[Validators.required]),
                   lastname: new FormControl('Bruno',[Validators.required]),
                   email:new FormControl('bruno@bureau401.fr',[Validators.required,Validators.email]),
                   creator:new FormControl(true)
                }),
                new FormGroup({
                   firstname: new FormControl('Daniel'),
                   lastname: new FormControl('Daniel'),
                   email:new FormControl('daniel@bureau401.fr',[Validators.email]),
                   creator:new FormControl(false)
                }),
                new FormGroup({
                   firstname: new FormControl('Esteban'),
                   lastname: new FormControl('Esteban'),
                   email:new FormControl('esteban@bureau401.fr',[Validators.email]),
                   creator:new FormControl(false)
                })
            ]),
            'discounts': new FormArray([])
        });
    }
    
    protected onSubmit(){
        let formData = this.myForm.getRawValue();
        formData.numberOfPlayers = (<FormArray>this.myForm.get('subscribers')).length;
        this.performSaveSession(formData);
    }

    protected performSaveSession(formData:any){
        this.roomService.createSession(formData).subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log("Error occured");
            }
        );;
    }

    protected removeAt(i){
        if (i > 0){
            (<FormArray>this.myForm.get('subscribers')).removeAt(i);
        }
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
        return control.value === '' ? null : Validators.email(control);
    }
}
