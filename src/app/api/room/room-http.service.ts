import { Injectable, Inject} from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AbstractHttpService} from '../abstract-http.service';

import { RoomService} from './room.service';
import { LoggerService} from '../../utils/logger.service';

import { RoomModel } from '../../model/room.model';

import * as moment from 'moment';

@Injectable()
export class HttpRoomService extends AbstractHttpService implements RoomService{
    constructor(http: Http, @Inject('LoggerService') private _loggerService: LoggerService, authHttp : AuthHttp) {
        super(http, _loggerService, authHttp);
    }

    loadRoom(id: number, begin: Date, end: Date, onSuccess: (result: any) => any, onError: (error: any) => any): void {
        function roomSuccess (result) : void{
            let roomModel: RoomModel = new RoomModel();
            roomModel.planning = result.message;
            onSuccess(roomModel);
        };
        this.httpPost('room/planning', { idRoom: id, startDateTime: this.dateForApi(begin), endDateTime: this.dateForApi(end) }, null, roomSuccess, onError);
    };

    addSession(id: number, date: Date, duration: number, onSuccess: (result: any) => any, onError: (error: any) => any): void {
        this.authHttpPost('staff/availability/create', { room_id: id, startDateTime: this.dateForApi(date), endDateTime: this.dateForApi(moment(date).add(120, "m").toDate()), gameTotalDuration: duration }, null, onSuccess, onError);
    }


}