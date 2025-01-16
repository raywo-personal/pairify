import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationComponent} from './navigation/components/navigation/navigation.component';
import {TopBarComponent} from './navigation/components/top-bar/top-bar.component';
import {PersistenceService} from './shared/services/persistence.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private persistenceService = inject(PersistenceService);


  public ngOnInit() {
    this.persistenceService.readAllData();
  }
}
