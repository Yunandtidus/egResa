import { Component, OnInit, Inject, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IMyOptions, IMyDateModel, IMyDayLabels, IMyMonthLabels} from 'mydatepicker';

import { RoomService } from '../../api/room.service';

import { RoomModel } from '../../model/room.model';

@Component({
    moduleId: module.id,
    selector: 'my-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
    public static DAY_LABELS:string[] = [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche'
    ];

    public static MONTH_LABELS: IMyMonthLabels = {
        1: 'Janvier',
        2: 'Février',
        3: 'Mars',
        4: 'Avril',
        5: 'Mai',
        6: 'Juin',
        7: 'Juillet',
        8: 'Août',
        9: 'Septembre',
        10: 'Octobre',
        11: 'Novembre',
        12: 'Décembre'
    };
    private dateConverter(d: Date) {
        return { date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() } };
    };

    @Input()
    private date: Date;

    @Input()
    private onChange: (date: any) => any;

    @Input()
    private mode: String

    private dateModel: Object;

    constructor(private formBuilder: FormBuilder) {
    };

    ngOnInit() {
        this.dateModel = this.dateConverter(this.date);
        this.onChange(this.date);
    };
    

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd mmm yyyy',
        dayLabels: <IMyDayLabels> {
            su: DatepickerComponent.DAY_LABELS[6],
            mo: DatepickerComponent.DAY_LABELS[0],
            tu: DatepickerComponent.DAY_LABELS[1],
            we: DatepickerComponent.DAY_LABELS[2],
            th: DatepickerComponent.DAY_LABELS[3],
            fr: DatepickerComponent.DAY_LABELS[4],
            sa: DatepickerComponent.DAY_LABELS[5]
        },
        monthLabels: DatepickerComponent.MONTH_LABELS,
        todayBtnTxt : "Aujourd'hui"
    };

    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onDateChanged(event: IMyDateModel) {
        if (this.onChange) {
            this.onChange(event.jsdate);
        }
    }


    shiftDate(value: number) {
        console.log(this.mode);
        if (this.mode == "week") {
            this.date.setDate(this.date.getDate() + value*7);
        } else if (this.mode == "month") {
            this.date.setMonth(this.date.getMonth() + value);
        } else {
            this.date.setDate(this.date.getDate() + value);
        }
        this.dateModel = this.dateConverter(this.date)
        this.onChange(this.date);
    };
}