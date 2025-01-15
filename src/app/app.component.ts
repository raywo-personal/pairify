import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from './navigation/components/navigation/navigation.component';
import {TopBarComponent} from './navigation/components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
