import { Subscriber } from './subscriber.model';
export class CreateSessionModel {
    idAvailability:number;
    startDateTime:string;
    numberOfPlayers:number;
    level:number;
    subscribers:Subscriber[];
    discounts:any[]
}