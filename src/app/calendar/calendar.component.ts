import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IMyOptions, IMyDateModel} from 'mydatepicker';

import { RoomService } from '../api/room/room.service';
import { DatepickerComponent } from './datepicker/datepicker.component';

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

    DAY_OF_WEEK = DatepickerComponent.DAY_LABELS;

    currentDate = new Date();

    room: RoomModel;
    hours: number[];

    private mode: string = "week";

    private modes = {'day' : this.modeDay, 'week' : this.modeWeek, 'month' : this.modeMonth};

    days: Date[];
    monthWeeks: Date[][];

    planning: AvailableSessionModel[][];

    constructor( @Inject("RoomService") private roomService: RoomService) {
        this.midnight(this.currentDate);
    }

    ngOnInit(){
        this.hours = [];
        for (let i = CalendarComponent.HOUR_START; i <= CalendarComponent.HOUR_END; i += CalendarComponent.DELTA_TIME) {
            this.hours.push(i);
        }
    };

    onChange() {
        let thisHelper: CalendarComponent = this;
        return (date: Date) => {
            thisHelper.currentDate = new Date(date.getTime());
            thisHelper.modes[thisHelper.mode].bind(thisHelper)();
            thisHelper.roomService.loadRoom(1, thisHelper.days[0], moment(thisHelper.days[thisHelper.days.length-1]).add(1, "days").toDate(),
                thisHelper.constructSession.bind(thisHelper),
                null);
        }
    };
    
    constructSession(roomData: RoomModel) {
        this.room = roomData;
        this.refreshPlanning();
    }

    refreshPlanning() {
        this.planning = [];

        for (let d of this.days) {
            let dayPlanning = [];
            for (let i = CalendarComponent.HOUR_START; i <= CalendarComponent.HOUR_END; i += CalendarComponent.DELTA_TIME) {
                dayPlanning.push(null);
            }
            this.planning.push(dayPlanning);
        }

        for (let a of this.room.planning) {
            let d = moment(a.hour_start, 'YYYY-MM-DD hh:mm').toDate();
            let hour = d.getHours() + d.getMinutes() / 60;
            this.midnight(d);
            for (let i in this.days) {
                if (d.getTime() == this.days[i].getTime()) {
                    this.planning[i][(hour - CalendarComponent.HOUR_START) / CalendarComponent.DELTA_TIME] = a;
                }
            }
        }
    }

    addSession(day: Date, hour: number) {
        console.log("ajout de session" + day + hour);
        let d: Date = new Date();
        d.setTime(day.getTime());
        d.setHours(Math.round(hour));
        d.setMinutes((hour - Math.round(hour)) * 60);
        d.setSeconds(0);
        d.setMilliseconds(0);
        this.roomService.addSession(1, d, 90, function (result) { console.log("ok", result); }, function onError(e) { console.log(e, "ko");});
        this.onChange()(this.currentDate);
    }

    modeDay() {
        this.mode = "day";
        this.days = [this.currentDate];
    };

    modeWeek() {
        this.mode = "week";
        this.days = [this.currentDate];
        console.log(this.currentDate);
        for (let i = 1; i < 7; i++) {
            let d = new Date();
            d.setTime(this.currentDate.getTime());
            d.setDate(d.getDate() + i);
            this.days.push(d);
        }
    }

    modeMonth() {
        this.mode = "month";
        this.days = [];
        this.monthWeeks = [];
        let firstMonday = new Date(this.currentDate.getFullYear(), 1, 1, 0, 0, 0, 0);
        firstMonday.setMonth(this.currentDate.getMonth());
        firstMonday.setDate(1);
        firstMonday.setDate(firstMonday.getDate() - firstMonday.getDay() + 1);
        for (let i = 0; i < 5; i++) {
            this.monthWeeks.push([]);
            for (let d = 0; d < 7; d++) {
                let date: Date = new Date();
                date.setTime(firstMonday.getTime());
                this.monthWeeks[i].push(date);
                this.days.push(date);
                firstMonday.setDate(firstMonday.getDate() + 1);
            }
        }
    }    

    showHour(h: number) {
        return Math.round(h) == h;
    }

    midnight(d: Date) {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
    }

}