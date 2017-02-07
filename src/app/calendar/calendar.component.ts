import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IMyOptions, IMyDateModel} from 'mydatepicker';

import { RoomService } from '../api/room.service';

import { RoomModel } from '../model/room.model';
import { AvailableSessionModel } from '../model/available-session.model';
import { ScheduleModel } from '../model/schedule.model';

import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'my-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent{

    currentDate = new Date(2017, 1, 15);

    room: RoomModel;
    sessionTimes: ScheduleModel[];

    thisHelper: CalendarComponent = this;

    constructor( @Inject("RoomService") private roomService: RoomService) {
    };

    onChange() {
        let thisHelper = this;
        return (date: Date) => {
            thisHelper.currentDate = date;
            thisHelper.roomService.loadRoom(1,
                thisHelper.constructSession.bind(thisHelper),
                null);
        }
    };
    
    constructSession(roomData: RoomModel) {
        this.room = roomData;
        this.sessionTimes = [];
        for (let i = 10; i <= 24; i += 0.5) {
            this.sessionTimes.push(<ScheduleModel>{ hour: i, session : this.getSession(i) });
        }
    }

    getSession(sessionTime: number): AvailableSessionModel {
        let tmpDate = new Date();
        tmpDate.setTime(this.currentDate.getTime());
        let hour = Math.round(sessionTime);
        let minute = (sessionTime - hour) * 60;
        tmpDate.setHours(hour, minute, 0, 0);
        for (let a of this.room.planning) {
            if (moment(a.hour_start, 'YYYY-MM-DD hh:mm:ss').toDate().getTime() === tmpDate.getTime()) {
                return a;
            }
        };
        return null;
    }

}