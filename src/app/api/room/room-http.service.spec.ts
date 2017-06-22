/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpRoomService } from './room-http.service';

describe('RoomHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [HttpRoomService]
    });
  });

  it('should ...', inject([HttpRoomService], (service: HttpRoomService) => {
    expect(service).toBeTruthy();
  }));
});
