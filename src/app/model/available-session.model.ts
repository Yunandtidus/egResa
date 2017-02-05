export class AvailableSessionModel {
    idAvailability:number;
    hourStart: number;
    hourEnd: number;
    isFree: boolean;

    getNbCreneau(secondsPerCreneau: number): number {
        return this.hourEnd - this.hourStart / secondsPerCreneau
    }
}