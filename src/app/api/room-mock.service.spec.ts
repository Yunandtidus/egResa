/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoomMockService } from './room-mock.service';

describe('RoomMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomMockService]
    });
  });

  it('should ...', inject([RoomMockService], (service: RoomMockService) => {
    expect(service).toBeTruthy();
  }));
});
