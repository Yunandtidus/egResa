import { CreateSessionModel } from './../../model/create-session-model';
import { Injectable, Inject} from '@angular/core';
import { Response, URLSearchParams, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

import { HttpApi} from '../http-api.service';

import { RoomModel } from '../../model/room.model';
import { ReservationModel } from '../../model/reservation.model';

import * as moment from 'moment';

@Injectable()
export class HttpRoomService {
    constructor(private http: HttpApi) {
    }

    private reservationModel: ReservationModel= null;
    public createSessionData:CreateSessionModel;

    loadRoom(id: number, begin: Date, end: Date): Observable<RoomModel> {
        return this.http.post('room/planning', { idRoom: id, startDateTime: begin, endDateTime: end }, null)
            .map(res => {let roomModel: RoomModel = new RoomModel(); roomModel.planning = res["message"]; return roomModel});
    };

    addSession(id: number, date: Date, duration: number): Observable<Response> {
        return this.http.authPost('staff/availability/create', { room_id: id, startDateTime: date, endDateTime: moment(date).add(120, "m").toDate(), gameTotalDuration: duration }, null);
    }

    getReservationModel(): ReservationModel {
        if (this.reservationModel == null) {
            this.reservationModel = new ReservationModel();
        }
        return this.reservationModel;
    }

    createSession(model : CreateSessionModel){
        return this.http.post('session/create', model, null).subscribe(
                res => {
                  console.log(res);
                },
                err => {
                  console.log("Error occured");
                }
              );
    }

    validateSession(model : any){
        return this.http.post('session/validate', model, null).subscribe(
                res => {
                  console.log(res);
                },
                err => {
                  console.log("Error occured");
                }
              );
    }
    
}