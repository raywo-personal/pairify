import {Injectable} from '@angular/core';
import {filter, map, Subject, Subscription} from 'rxjs';
import {BusEvent, EventPayload} from './event.model';


@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private subject = new Subject<BusEvent>();
  public readonly events$ = this.subject.asObservable();


  public emit(event: BusEvent) {
    this.subject.next(event);
  }


  public on(event: BusEvent, callback: (payload: EventPayload) => void): Subscription {
    return this.subject
      .pipe(
        filter(e => e.type === event.type),
        map(e => e.payload)
      )
      .subscribe(payload => callback(payload));
  }

}
