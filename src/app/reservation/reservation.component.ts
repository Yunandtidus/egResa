import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

import { HttpRoomService } from '../api/room/room-http.service';
import { ReservationModel } from '../model/reservation.model';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

    private subscribers : any[] = [{}];

    constructor( private roomService: HttpRoomService) { 
    }

    ngOnInit() {
    }

    getReservation(): ReservationModel {
        return this.roomService.getReservationModel();
    }

    submit(f : NgForm){
        console.log(f.value, this.subscribers);
    }
}
