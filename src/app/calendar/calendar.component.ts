import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IMyOptions, IMyDateModel} from 'mydatepicker';

import { RoomService } from '../api/room.service';

import { RoomModel } from '../model/room.model';

@Component({
    moduleId: module.id,
    selector: 'my-calendar',
    templateUrl: './calendar.template.html',
    styleUrls: ['./calendar.style.css']
})
export class CalendarComponent implements OnInit {
    private dateConverter(d: Date) {
        return { date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() } };
    };

    private myForm: FormGroup;
    private myDate: Date = new Date();

    dateModel = this.dateConverter(this.myDate);

    constructor(private formBuilder: FormBuilder, @Inject("RoomService") private roomService: RoomService) {
    };

    ngOnInit() {
        this.loadData();
    };

    loadData() {
        this.roomService.loadRoom(1, data => this.test = data, null);
    }
    test: RoomModel;
    errorMessage: Object;

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd mmm yyyy',
    };

    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onDateChanged(event: IMyDateModel) {
        this.myDate = event.jsdate;
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }

    addDay(value: number) {
        this.myDate.setDate(this.myDate.getDate() + (value ? value : 1));
        this.dateModel = this.dateConverter(this.myDate)
    };
}