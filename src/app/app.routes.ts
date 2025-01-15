import {Routes} from '@angular/router';
import {StartComponent} from './navigation/start/components/start/start.component';


export const routes: Routes = [
  {
    path: "",
    redirectTo: "/start",
    pathMatch: "full"
  },
  {
    path: "start",
    component: StartComponent,
    data: {title: "Start", icon: "house-door"},
    pathMatch: "full"
  },
];
