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
                    hourStart: new Date(2017, 2, 5, 18, 0, 0).getTime(),
                    hourEnd: new Date(2017, 2, 5, 20, 0, 0).getTime(),
                    isFree: true
                },
                <AvailableSessionModel>{
                    idAvailability: 1,
                    hourStart: new Date(2017, 2, 5, 20, 0, 0).getTime(),
                    hourEnd: new Date(2017, 2, 5, 22, 0, 0).getTime(),
                    isFree: false
                },
                <AvailableSessionModel>{
                    idAvailability: 1,
                    hourStart: new Date(2017, 2, 5, 22, 0, 0).getTime(),
                    hourEnd: new Date(2017, 2, 5, 24, 0, 0).getTime(),
                    isFree: false
                }
            ]
        }
    };

    loadRoom(id: number, onSuccess: (result: any) => any, onError: (error: any) => any): void {
        onSuccess(this.ROOMS[1]);
    }
}