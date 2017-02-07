import { AvailableSessionModel } from './available-session.model';

export class ScheduleModel {
    date: Date;
    sessions: AvailableSessionModel[] = [];
}