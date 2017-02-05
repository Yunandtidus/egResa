import { Component, OnInit, Inject, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IMyOptions, IMyDateModel} from 'mydatepicker';

import { RoomService } from '../api/room.service';

import { RoomModel } from '../model/room.model';

@Component({
    moduleId: module.id,
    selector: 'my-datepicker',
    templateUrl: './datepicker.template.html',
    styleUrls: ['./datepicker.style.css']
})
export class DatepickerComponent implements OnInit {
    private dateConverter(d: Date) {
        return { date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() } };
    };

    @Input()
    private date: Date;

    @Input()
    private onChange: (date:any) => any;

    private dateModel: Object;

    constructor(private formBuilder: FormBuilder) {
    };

    ngOnInit() {
        this.dateModel = this.dateConverter(this.date);
    };
    

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd mmm yyyy',
    };

    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onDateChanged(event: IMyDateModel) {
        if (this.onChange) {
            this.onChange(event.jsdate);
        }
    }

    addDay(value: number) {
        this.date.setDate(this.date.getDate() + (value ? value : 1));
        this.dateModel = this.dateConverter(this.date)
    };
}