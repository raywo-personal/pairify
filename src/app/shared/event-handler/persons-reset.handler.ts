import {EventType} from '../event-bus/event.model';
import {EventHandler} from './event.handler';
import {inject, Injectable} from '@angular/core';
import {GroupingService} from '../../grouping/services/grouping.service';


@Injectable({
  providedIn: 'root'
})
export class PersonsResetHandler implements EventHandler<void> {

  private groupingService = inject(GroupingService);

  public eventType = EventType.PERSONS_RESET;


  public handle(): void {
    this.groupingService.resetTeams();
  }
}
