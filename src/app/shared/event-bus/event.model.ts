import {Person} from '../../persons/models/person.model';


export enum EventType {
  PERSON_CREATED, PERSON_DELETED, PERSON_UPDATED, PERSONS_RESET,
}

export type EventPayload = Person | void;

export interface BusEvent {
  type: EventType;
  payload: EventPayload;
}


export function createBusEvent(type: EventType, payload: EventPayload): BusEvent {
  return {
    type,
    payload
  };
}
