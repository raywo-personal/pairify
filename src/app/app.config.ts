import {ApplicationConfig, inject, provideAppInitializer} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {DomainLogicService} from './shared/services/domain-logic.service';


function initializeApp() {
  inject(DomainLogicService);
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAppInitializer(initializeApp)
  ]
};
