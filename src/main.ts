import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

import * as moment from 'moment';

if (environment.production) {
  enableProdMode();
}

Date.prototype.toJSON = function(){ return moment(this).format("YYYY-MM-DD HH:mm:ss"); }

platformBrowserDynamic().bootstrapModule(AppModule);
