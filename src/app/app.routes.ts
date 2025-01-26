import {Routes} from '@angular/router';
import {StartComponent} from './start/components/start/start.component';
import {PersonListComponent} from './persons/components/person-list/person-list.component';


export const routes: Routes = [
  {
    path: "",
    redirectTo: "/start",
    pathMatch: "full"
  },
  {
    path: "start",
    component: StartComponent,
    data: {title: $localize`:start menu title@@p.start-menu:Create teams`, icon: "house-door"},
    pathMatch: "full"
  },
  {
    path: "persons",
    component: PersonListComponent,
    data: {title: $localize`:persons menu title@@p.persons-menu:Persons`, icon: "people"},
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/start"
  }
];
