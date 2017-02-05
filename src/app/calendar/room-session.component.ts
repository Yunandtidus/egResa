import { Component, OnInit, Inject, Input} from '@angular/core';

import { RoomModel } from '../model/room.model';
import { AvailableSessionModel } from '../model/available-session.model';

@Component({
    moduleId: module.id,
    selector: 'my-room-session',
    templateUrl: './room-session.template.html'
})
export class RoomSessionComponent {
    @Input()
    room: RoomModel;
    @Input()
    roomSession: AvailableSessionModel;
}