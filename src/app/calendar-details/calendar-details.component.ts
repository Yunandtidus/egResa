import { HttpAuthService } from './../api/auth/auth-http.service';
import { AvailableSessionModel } from './../model/available-session.model';
import { CreateSessionModel } from './../model/create-session-model';
import { HttpRoomService } from './../api/room/room-http.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.less']
})
export class CalendarDetailsComponent implements OnInit {

    @Input() day: Date;
    @Input() hour: number;
    private minutes: number;
    @Input() sessionModel: AvailableSessionModel;

    private selected: boolean = false;

    constructor( private router:Router, private roomService: HttpRoomService, private authService : HttpAuthService) { }

    ngOnInit() {
        this.minutes = (this.hour - Math.round(this.hour)) * 60;
        this.hour = Math.round(this.hour);
    }

    addSession() {
        console.log("ajout de session" + this.day + this.hour);
        let d: Date = new Date();
        d.setTime(this.day.getTime());
        d.setHours(this.hour);
        d.setMinutes(this.minutes);
        d.setSeconds(0);
        d.setMilliseconds(0);
        this.roomService.addSession(1, d, 90)
            .subscribe(
                result => {console.log("session creation ok", result); }, 
                e => { console.log(e, "ko")}                
            );
        this.selected = true;
      
    }

    reserveSession(){       
        let createSessionModel : CreateSessionModel = new CreateSessionModel();
        createSessionModel.startDateTime = this.sessionModel.hour_start;
        createSessionModel.idAvailability = this.sessionModel.idAvailability;
        this.roomService.createSessionData = createSessionModel;
        this.router.navigate(['/reservation']);
    }

    isAdmin(){
        return this.authService.isAdmin();
    }
}
