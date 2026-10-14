import {Component, inject, OnInit, signal} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-top-bar]',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {

  protected readonly currentTitle = signal("");
  protected readonly icon = signal<string | undefined>(undefined);

  private router = inject(Router);


  public ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          let title = "";
          let icon = "";

          while (route.firstChild) {
            route = route.firstChild;
            if (route.snapshot.data['title']) {
              title = route.snapshot.data['title'];
              icon = route.snapshot.data['icon'];
            }
          }

          return {title, icon};
        })
      )
      .subscribe(tupel => {
        this.currentTitle.set(tupel.title);
        this.icon.set(tupel.icon);
      });
  }
}
