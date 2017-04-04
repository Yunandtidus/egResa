import { Injectable, Inject} from '@angular/core';4

import { RoomService} from './room.service';
import { LoggerService} from '../../utils/logger.service';

import { RoomModel } from '../../model/room.model';
import { AvailableSessionModel } from '../../model/available-session.model';

@Injectable()
export class MockRoomService implements RoomService{

    static buildSession(month: number, day: number, hour: number, minutes: number): AvailableSessionModel {
        return <AvailableSessionModel>{
            idAvailability: 1,
            hour_start: "2017-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2) + " " + ("0" + hour).slice(-2) + ":" + ("0" + minutes).slice(-2)+":00",
            hourEnd: "2017-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2) + " " + ("0" +( hour + (Math.random() > 0.5? 1:2))).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":00",
            is_free: Math.random() > 0.5 ? true : false
        };
    }


    private ROOMS: { [id: number]: RoomModel } = {
        1: <RoomModel>{
            id: '1',
            name: 'Salle1',
            description: 'Desc salle1',
            available: true,
            gameDuration: null,
            totalDuration: null,
            planning: [
                MockRoomService.buildSession(2, 15, 18, 0),
                MockRoomService.buildSession(2, 15, 20, 0),
                MockRoomService.buildSession(2, 15, 22, 0),
                MockRoomService.buildSession(2, 16, 16, 0),
                MockRoomService.buildSession(2, 16, 18, 0),
                MockRoomService.buildSession(2, 16, 20, 0),
                MockRoomService.buildSession(2, 16, 22, 0),
                MockRoomService.buildSession(2, 17, 19, 30),
            ]
        }
    };

    loadRoom(id: number, begin:Date, end: Date, onSuccess: (result: any) => any, onError: (error: any) => any): void {
        onSuccess(this.ROOMS[1]);
    }

    addSession(id: number, date: Date, duration:number, onSuccess: (result: any) => any, onError: (error: any) => any): void {
        this.ROOMS[1].planning.push(MockRoomService.buildSession(date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes()));
    }
}