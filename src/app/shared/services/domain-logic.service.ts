import {inject, Injectable} from '@angular/core';
import {EventBusService} from '../event-bus/event-bus.service';
import {PersistenceService} from './persistence.service';
import {EventPayload} from '../event-bus/event.model';
import {EventHandler} from '../event-handler/event.handler';


@Injectable({
  providedIn: 'root'
})
export class DomainLogicService {

  private eventBus = inject(EventBusService);
  private events$ = this.eventBus.events$;

  private persistenceService = inject(PersistenceService);

  private handler: EventHandler<EventPayload>[] = [];


  constructor() {
    this.events$.subscribe(event => {
      this.handler
        .filter(handler => handler.eventType === event.type)
        .map(handler => handler.handle(event.payload));
      this.persistenceService.saveAllData();
    });
  }

}
