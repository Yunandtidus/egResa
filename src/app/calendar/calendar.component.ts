import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IMyOptions, IMyDateModel} from 'mydatepicker';

import { RoomService } from '../api/room.service';

@Component({
    moduleId: module.id,
    selector: 'my-calendar',
    templateUrl: './calendar.template.html',
})
export class CalendarComponent implements OnInit {
    private dateConverter(d: Date) {
        return  {date: { year: d.getFullYear(), month: d.getMonth()+1, day: d.getDate()}};
    };

    private myForm: FormGroup;
    private myDate: Date = new Date();

    constructor(private formBuilder: FormBuilder, private roomService: RoomService) {
    };

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            // Empty string means no initial value. Can be also specific date for
            // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
            // value. It is also possible to set initial date using the selDate attribute.

            myDate: [this.dateConverter(this.myDate), Validators.required]
            // other controls are here...
        });

        this.loadData();
    }

    loadData() {
        this.roomService.loadRoom()
            .subscribe(
            heroes => this.test = heroes,
            error => this.errorMessage = <any>error);
    }
    test: Object;
    errorMessage: Object;

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd mmm yyyy',
    };

    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }

    addDay() {
        this.myDate.setDate(this.myDate.getDate() + 1);

        this.myForm.setValue({ myDate: this.dateConverter(this.myDate) }); 
    };
}
