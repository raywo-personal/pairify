import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GroupingService} from '../../services/grouping.service';
import {AsyncPipe} from '@angular/common';
import {TeamViewComponent} from '../team-view/team-view.component';


@Component({
  selector: 'app-grouping',
  imports: [
    FormsModule,
    AsyncPipe,
    TeamViewComponent
  ],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss'
})
export class GroupingComponent {

  private groupingService = inject(GroupingService);

  protected groupCount = 1;
  protected useDriver = true;

  protected teams$ = this.groupingService.teams$;


  protected onSubmit() {
    this.groupingService.teamsCount = this.groupCount;
    this.groupingService.useDriver = this.useDriver;
  }

}
