import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service'

@Injectable()
export class LoggerAlertService implements LoggerService {
    error(message: String): void {
        console.log(message);
    }
}