import { AvailableSessionModel } from './../../model/available-session.model';
import { CreateSessionModel } from './../../model/create-session-model';
import { Injectable, Inject} from '@angular/core';
import { Response, URLSearchParams, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { HttpApi} from '../http-api.service';

import { RoomModel } from '../../model/room.model';
import { ReservationModel } from '../../model/reservation.model';

import * as moment from 'moment';

@Injectable()
export class HttpRoomService {
    constructor(private http: HttpApi) {}

    public createSessionData:CreateSessionModel;

    /**
     * Load room planning between dates
     * @param id the room's id
     * @param begin the begin date
     * @param end the end date
     */
    loadRoomPlanning(id: number, begin: Date, end: Date): Observable<AvailableSessionModel[]> {
        return this.http.post('room/planning', { idRoom: id, startDateTime: begin, endDateTime: end }, null)
            .map(res => {let planning: AvailableSessionModel[] = res["message"]; return planning;});
    };

    /**
     * Create a session available for players
     * @param id the room's id
     * @param date the begin date
     * @param duration the duration (in minutes)
     */
    addSession(id: number, date: Date, duration: number): Observable<any> {
        return this.http.authPost('staff/availability/create', { room_id: id, startDateTime: date, endDateTime: moment(date).add(120, "m").toDate(), gameTotalDuration: duration }, null);
    }

    consultSession(session_id : number): Observable<CreateSessionModel> {
        return this.http.authPost("session/consult", {session_id : session_id}, null)
            .map(res => {
                let session: CreateSessionModel = res["message"]; return session;
            });
    }

    createSession(model : CreateSessionModel): Observable<any> {
        return this.http.post('session/create', model, null);
    }

    validateSession(model : any): Observable<any>{
        return this.http.post('session/validate', model, null)
    }
    
}