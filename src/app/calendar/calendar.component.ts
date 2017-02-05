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

    currentDate = new Date();

    constructor( @Inject("RoomService") private roomService: RoomService) {
    };

    ngOnInit() {
        this.loadData();
    };

    loadData() {
        this.roomService.loadRoom(1, data => this.test = data, null);
    }
    test: RoomModel;
    errorMessage: Object;
}