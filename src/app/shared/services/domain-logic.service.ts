import {inject, Injectable} from '@angular/core';
import {EventBusService} from '../event-bus/event-bus.service';
import {PersistenceService} from './persistence.service';
import {EventPayload, EventType} from '../event-bus/event.model';
import {EventHandler} from '../event-handler/event.handler';
import {PersonsResetHandler} from '../event-handler/persons-reset.handler';


@Injectable({
  providedIn: 'root'
})
export class DomainLogicService {

  private readonly eventsWithPersistence: EventType[] = [
    EventType.PERSON_CREATED,
    EventType.PERSON_DELETED,
    EventType.PERSON_UPDATED,
    EventType.PERSONS_RESET,
    EventType.TEAMS_CREATED,
    EventType.TEAMS_RESET
  ];

  private eventBus = inject(EventBusService);
  private events$ = this.eventBus.events$;

  private persistenceService = inject(PersistenceService);

  private handler: EventHandler<EventPayload>[] = [
    inject(PersonsResetHandler)
  ];


  constructor() {
    this.events$.subscribe(event => {
      this.handler
        .filter(handler => handler.eventType === event.type)
        .map(handler => handler.handle(event.payload));

      if (this.eventNeedsPersistence(event.type)) {
        this.persistenceService.saveAllData();
      }
    });
  }


  private eventNeedsPersistence(event: EventType): boolean {
    return this.eventsWithPersistence.includes(event);
  }

}
