import {Person} from '../../persons/models/person.model';
import {ImportError} from '../../import/models/import-error.type';


export enum EventType {
  PERSON_CREATED, PERSON_DELETED, PERSON_UPDATED, PERSONS_RESET,
  TEAMS_CREATED, TEAMS_RESET,
  DRAG_OVER, DRAG_LEAVE, DROP_ERROR,
  TXT_FILE_UPLOADED, JSON_FILE_UPLOADED, RESET_UPLOADED_FILE
}

export type EventPayload = Person | DragEvent | ImportError | Person[] | void;

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
