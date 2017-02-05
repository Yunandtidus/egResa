import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IMyOptions, IMyDateModel} from 'mydatepicker';

import { RoomService } from '../api/room.service';

import { RoomModel } from '../model/room.model';
import { AvailableSessionModel } from '../model/available-session.model';

@Component({
    moduleId: module.id,
    selector: 'my-calendar',
    templateUrl: './calendar.template.html',
    styleUrls: ['./calendar.style.css']
})
export class CalendarComponent implements OnInit {

    currentDate = new Date(2017,1,5);

    sessionTimes: number[] = [];

    constructor( @Inject("RoomService") private roomService: RoomService) {
    };

    ngOnInit() {
        this.roomService.loadRoom(1,
            function (data) {
                this.room = data;
                this.getSession(18)
            }.bind(this),
            null);
        for (let i = 10; i <= 24; i += 0.5) {
            this.sessionTimes.push(i);
        }
    };

    getSession(sessionTime: number): AvailableSessionModel {
        let tmpDate = new Date();
        tmpDate.setTime(this.currentDate.getTime());
        let hour = Math.round(sessionTime);
        let minute = (sessionTime - hour) * 60;
        tmpDate.setHours(hour, minute, 0, 0);
        for (let a of this.room.planning) {
            if (a.hourStart === tmpDate.getTime()) {
                return a;
            }
        };
        return null;
    }

    room : RoomModel;
    }