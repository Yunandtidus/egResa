import { HttpRoomService } from './../../api/room/room-http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.less']
})
export class ValidationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private roomService : HttpRoomService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       console.log(params);
      this.roomService.validateSession({"session_id" : +params.session_id, "code":params.code});
    });
  }

}
