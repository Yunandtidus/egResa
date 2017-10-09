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
export class ReservationComponent implements OnInit {

    private subscribers : Subscriber[] = [];
    public createSessionData:CreateSessionModel;
    myForm: FormGroup;
    levels = [
        "Debutant",
        "Confirmé",
        "expert"        
    ]
        
    constructor( private roomService: HttpRoomService) {
        this.myForm = new FormGroup({
            'startDateTime':new FormControl(this.roomService.createSessionData.startDateTime),
            'firstname':new FormControl('',Validators.required),
            'lastname':new FormControl('',Validators.required),
            'email':new FormControl('',[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
            'level': new FormControl('Debutant'),
            'player': new FormArray([
                 new FormGroup({
                   user: new FormControl('Jean Paul'),
                   mail:new FormControl('Jeanpaul@free.fr')
                }),
                new FormGroup({
                    user: new FormControl('bipbip'),
                    mail:new FormControl('coyotte@free.fr')
                 })
            ])})
    }

    ngOnInit() {

        this.createSessionData = this.roomService.createSessionData;
        console.log(this.createSessionData);
    }

    getReservation(): ReservationModel {
        return this.roomService.getReservationModel();
    }
    
    onSubmit(){
        let idAvailability = this.createSessionData.idAvailability;
        let startDateTime = this.createSessionData.startDateTime;
              
        
        let numberOfPalyer = this.myForm.get('player').value.length+1;
        let level = 1;
        let discount=[];

        let sub = new Subscriber();
        sub.creator = true;
        sub.firstname = this.myForm.get('firstname').value;
        sub.lastname =this.myForm.get('lastname').value;
        sub.email =this.myForm.get('email').value;

        this.subscribers.push(sub);
        this.roomService.createSession(idAvailability,startDateTime,numberOfPalyer,level,this.subscribers,[]);
     
        
        
    }
    removeAt(i){
        (<FormArray>this.myForm.get('player')).removeAt(i);
    }

    addPlayer(){
        (<FormArray>this.myForm.get('player')).push( new FormGroup({
            user: new FormControl('nom'),
            mail:new FormControl('Email')
         }))
    }    
}
