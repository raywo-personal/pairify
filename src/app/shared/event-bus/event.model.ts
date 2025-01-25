import {Person} from '../../persons/models/person.model';
import {DropError} from '../../import/models/drop-error.type';


export enum EventType {
  PERSON_CREATED, PERSON_DELETED, PERSON_UPDATED, PERSONS_RESET,
  DRAG_OVER, DRAG_LEAVE, DROP_ERROR,
  TXT_FILE_UPLOADED, JSON_FILE_UPLOADED, RESET_UPLOADED_FILE
}

export type EventPayload = Person | DragEvent | DropError | Person[] | void;

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
