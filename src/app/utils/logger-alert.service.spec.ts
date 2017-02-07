/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggerAlertService } from './logger-alert.service';

describe('LoggerAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerAlertService]
    });
  });

  it('should ...', inject([LoggerAlertService], (service: LoggerAlertService) => {
    expect(service).toBeTruthy();
  }));
});
