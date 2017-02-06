import { Injectable, Inject} from '@angular/core';4

import { RoomService} from './room.service';
import { LoggerService} from '../utils/logger.service';

import { RoomModel } from '../model/room.model';
import { AvailableSessionModel } from '../model/available-session.model';

@Injectable()
export class MockRoomService implements RoomService{

    private ROOMS: { [id: number]: RoomModel } = {
        1: <RoomModel>{
            id: '1',
            name: 'Salle1',
            description: 'Desc salle1',
            available: true,
            gameDuration: null,
            totalDuration: null,
            planning: [
                <AvailableSessionModel>{
                    idAvailability: 1,
                    hour_start: "2017-02-05 18:00:00",//new Date(2017, 1, 5, 18, 0, 0).getTime(),
                    hourEnd: "",
                    is_free: true
                },
                <AvailableSessionModel>{
                    idAvailability: 1,
                    hour_start: "2017-02-05 18:00:00",
                    hourEnd: "",
                    is_free: false
                },
                <AvailableSessionModel>{
                    idAvailability: 1,
                    hour_start: "2017-02-05 18:00:00",
                    hourEnd: "",
                    is_free: false
                },
                <AvailableSessionModel>{
                    idAvailability: 1,
                    hour_start: "2017-02-05 18:00:00",
                    hourEnd: "",
                    is_free: false
                }
            ]
        }
    };

    loadRoom(id: number, onSuccess: (result: any) => any, onError: (error: any) => any): void {
        onSuccess(this.ROOMS[1]);
    }
}