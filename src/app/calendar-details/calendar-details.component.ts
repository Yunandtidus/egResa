import { HttpRoomService } from './../api/room/room-http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.less']
})
export class CalendarDetailsComponent implements OnInit {
    choice: string;


@Input() hour:number;
@Input() day: Date;
@Input() state;


  constructor( private roomService: HttpRoomService) { }

  ngOnInit() {   
       
  }

   addSession(day: Date, hour: number) {
        // console.log("ajout de session" + day + hour);
        // let d: Date = new Date();
        // d.setTime(day.getTime());
        // d.setHours(Math.round(hour));
        // d.setMinutes((hour - Math.round(hour)) * 60);
        // d.setSeconds(0);
        // d.setMilliseconds(0);
        // this.roomService.addSession(1, d, 90)
        //     .subscribe(
        //         result => {this.mycolor="moyen"; this.state.etat="reservable"; console.log("ok", result); }, 
        //         e => { console.log(e, "ko")}                
        //     );
        this.choice = "selected";
      
    }

    createSession(){
    // [routerLink]="['/reservation']"
    console.log(this.hour);
    console.log(this.day);   
    
    }

}
