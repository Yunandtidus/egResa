import { Injectable, Inject} from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
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
    constructor(http: Http, @Inject('LoggerService') private _loggerService: LoggerService) {
        super(http, _loggerService);
    }

    loadRoom(id: number, begin: Date, end: Date, onSuccess: (result: any) => any, onError: (error: any) => any): void {
        function roomSuccess (result) : void{
            let roomModel: RoomModel = new RoomModel();
            roomModel.planning = result.message;
            onSuccess(roomModel);
        };
        this.makeRequest('room/planning', { idRoom: id, startDateTime: this.dateForApi(begin), endDateTime: this.dateForApi(end) }, null, roomSuccess, onError);
    };

    private dateForApi(date: Date): String {
        return moment(date).format("YYYY-MM-DD hh:mm:ss");
    }

}