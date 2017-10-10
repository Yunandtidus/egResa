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
export class ReservationComponent {

    private subscribers : Subscriber[] = [];
    public createSessionData:CreateSessionModel;
    myForm: FormGroup;
    levels = [
        {value:1, label:"Débutant"},
        {value:2, label:"Confirmé"},
        {value:3, label:"Expert"}
    ];
        
    constructor( private roomService: HttpRoomService) {
        this.createSessionData = this.roomService.createSessionData;
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

    getReservation(): ReservationModel {
        return this.roomService.getReservationModel();
    }
    
    onSubmit(){
        console.log(this.myForm.getRawValue());

        let formData = this.myForm.getRawValue();
        formData.numberOfPlayers = (<FormArray>this.myForm.get('subscribers')).length;
        this.roomService.createSession(formData);
    }

    removeAt(i){
        if (i > 0){
            (<FormArray>this.myForm.get('subscribers')).removeAt(i);
        }
    }

    addPlayer(){
        (<FormArray>this.myForm.get('subscribers')).push( new FormGroup({
            firstname: new FormControl('user'),
            lastname: new FormControl('user'),
            email: new FormControl('mail',[Validators.email]),
            creator:new FormControl(false)
         }))
    }    
}
