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

    static HOUR_START: number = 12;
    static HOUR_END: number = 24;
    static DELTA_TIME: number = 0.5;

    currentDate = new Date(2017, 1, 15);

    room: RoomModel;
    hours: number[];

    private mode = this.modeWeek;

    days: Date[];

    planning: AvailableSessionModel[][];

    thisHelper: CalendarComponent = this;

    constructor( @Inject("RoomService") private roomService: RoomService) {
    }

    ngOnInit(){
        this.hours = [];
        for (let i = CalendarComponent.HOUR_START; i <= CalendarComponent.HOUR_END; i += CalendarComponent.DELTA_TIME) {
            if (i == Math.round(i)) {
                this.hours.push(i);
            } else {
                this.hours.push(null);
            }
        }
    };

    onChange() {
        let thisHelper = this;
        return (date: Date) => {
            thisHelper.currentDate = date;
            thisHelper.mode();
            thisHelper.roomService.loadRoom(1,
                thisHelper.constructSession.bind(thisHelper),
                null);
        }
    };
    
    constructSession(roomData: RoomModel) {
        this.room = roomData;
        this.refreshPlanning();
    }

    refreshPlanning(){
        this.planning = [];

        for (let d of this.days) {
            let dayPlanning = [];
            for (let i = CalendarComponent.HOUR_START; i <= CalendarComponent.HOUR_END; i += CalendarComponent.DELTA_TIME) {
                dayPlanning.push(null);
            }
            this.planning.push(dayPlanning);
        }

        for (let a of this.room.planning) {
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

    modeDay() {
        this.mode = this.modeDay;
        this.days = [this.currentDate];
    }

    modeWeek() {
        this.mode = this.modeWeek;
        this.days = [this.currentDate];
        for (let i = 1; i < 7; i++) {
            let d = new Date();
            d.setTime(this.currentDate.getTime());
            d.setDate(d.getDate() + i);
            this.days.push(d);
        }
    }

}