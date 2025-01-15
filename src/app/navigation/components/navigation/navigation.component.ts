import {Component, OnInit} from '@angular/core';
import {NgbNavModule, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NavItem} from '../../routes/nav-item.model';
import {routes} from '../../../app.routes';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nav:[app-navigation]',
  imports: [
    NgbNavModule,
    RouterLink,
    RouterLinkActive,
    NgbTooltip
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  protected active = "top";
  protected navItems: NavItem[] = [];


  public ngOnInit(): void {
    this.navItems = routes
      .filter(route => route.path && route.path !== "" && route.path !== "**")
      .map(route => {
        const data = route.data || {title: "", icon: ""};

        return {
          title: data["title"],
          link: route.path || "",
          icon: data["icon"]
        }
      });
  }

}
