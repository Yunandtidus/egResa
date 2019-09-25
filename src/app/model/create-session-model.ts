import { Subscriber } from './subscriber.model';
export class CreateSessionModel {
    idRoom:number;
    idAvailability:number;
    startDateTime:Date;
    numberOfPlayers:number;
    level:number;
    subscribers:Subscriber[];
    discounts:any[]
}
