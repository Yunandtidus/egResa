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
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi'
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
    private onChange: (date:any) => any;

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
            su: DatepickerComponent.DAY_LABELS[0],
            mo: DatepickerComponent.DAY_LABELS[1],
            tu: DatepickerComponent.DAY_LABELS[2],
            we: DatepickerComponent.DAY_LABELS[3],
            th: DatepickerComponent.DAY_LABELS[4],
            fr: DatepickerComponent.DAY_LABELS[5],
            sa: DatepickerComponent.DAY_LABELS[6]
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

    addDay(value: number) {
        this.date.setDate(this.date.getDate() + (value ? value : 1));
        this.dateModel = this.dateConverter(this.date)
        this.onChange(this.date);
    };
}