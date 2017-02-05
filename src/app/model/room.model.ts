import { AvailableSessionModel } from './available-session.model';

export class RoomModel {
    id: String;
    name: String;
    description: String;
    available: boolean;
    gameDuration: number;
    totalDuration: number;
    planning: AvailableSessionModel[];
}
