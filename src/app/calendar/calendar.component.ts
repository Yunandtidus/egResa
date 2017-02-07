import { Component, OnInit, Inject } from '@angular/core';
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
export class CalendarComponent implements OnInit{

    static HOUR_START: number = 8;
    static HOUR_END: number = 24;
    static DELTA_TIME: number = 0.5;

    currentDate = new Date(2017, 1, 15);

    room: RoomModel;
    hours: number[];

    days: Date[] = [new Date(2017, 1, 15), new Date(2017, 1, 16), new Date(2017, 1, 17)];

    planning: AvailableSessionModel[][];

    thisHelper: CalendarComponent = this;

    constructor( @Inject("RoomService") private roomService: RoomService) {
    }

    ngOnInit(){
        this.hours = [];
        for (let i = CalendarComponent.HOUR_START; i <= CalendarComponent.HOUR_END; i += CalendarComponent.DELTA_TIME) {
            this.hours.push(i);
        }
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

        this.planning = [];

        for (let d of this.days) {
            let dayPlanning = [];
            for (let i = CalendarComponent.HOUR_START; i <= CalendarComponent.HOUR_END; i += CalendarComponent.DELTA_TIME) {
                dayPlanning.push(null);
            }
            this.planning.push(dayPlanning);
        }

        for (let a of roomData.planning) {
            let d = moment(a.hour_start, 'YYYY-MM-DD hh').toDate();
            let hour = d.getHours();
            d.setHours(0);
            for (let i in this.days) {
                if (d.getTime() == this.days[i].getTime()) {
                    this.planning[i][(hour - CalendarComponent.HOUR_START) / CalendarComponent.DELTA_TIME] = a;
                }
            }
        }
    }

    getSession(date: Date, sessionTime: number): AvailableSessionModel {
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