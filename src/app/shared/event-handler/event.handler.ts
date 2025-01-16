import {EventPayload, EventType} from '../event-bus/event.model';


export interface EventHandler<T extends EventPayload> {

  get eventType(): EventType;

  handle(payload: T): void;

}
