import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationComponent} from './navigation/components/navigation/navigation.component';
import {TopBarComponent} from './navigation/components/top-bar/top-bar.component';
import {PersistenceService} from './shared/services/persistence.service';
import {EventBusService} from './shared/event-bus/event-bus.service';
import {createBusEvent, EventType} from './shared/event-bus/event.model';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private readonly persistenceService = inject(PersistenceService);
  private readonly eventBus = inject(EventBusService);


  public ngOnInit() {
    this.persistenceService.readAllData();
  }


  protected onDragOver(dragEvent: DragEvent) {
    this.eventBus.emit(createBusEvent(EventType.DRAG_OVER, dragEvent));
  }


  protected onDragLeave() {
    this.eventBus.emit(createBusEvent(EventType.DRAG_LEAVE));
  }
}
