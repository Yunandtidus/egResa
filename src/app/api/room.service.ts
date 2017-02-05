import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { RoomModel } from '../model/room.model';

@Injectable()
export interface RoomService {

    /**
    * @param id : the room id
    * @throw error
    */
    loadRoom(id: number, onSuccess: (result: any) => any, onError: (error: any) => any): void;
    
}