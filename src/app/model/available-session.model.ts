export class AvailableSessionModel {
    static NO_SESSION = new AvailableSessionModel();

    idAvailability:number;
    hourStart: number;
    hourEnd: number;
    isFree: boolean;

    getNbCreneau(minutesPerCreneau: number): number {
        return this.hourEnd - this.hourStart / minutesPerCreneau
    }
}