/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoomHttpService } from './room-http.service';

describe('RoomHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomHttpService]
    });
  });

  it('should ...', inject([RoomHttpService], (service: RoomHttpService) => {
    expect(service).toBeTruthy();
  }));
});
