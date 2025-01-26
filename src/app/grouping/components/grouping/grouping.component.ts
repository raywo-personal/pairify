import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GroupingService} from '../../services/grouping.service';
import {AsyncPipe} from '@angular/common';
import {TeamViewComponent} from '../team-view/team-view.component';
import {PersonService} from '../../../persons/services/person.service';
import {AutofocusDirective} from '../../../shared/directives/autofocus.directive';


@Component({
  selector: 'app-grouping',
  imports: [
    FormsModule,
    AsyncPipe,
    TeamViewComponent,
    AutofocusDirective
  ],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss'
})
export class GroupingComponent {

  private groupingService = inject(GroupingService);
  private personService = inject(PersonService);

  protected groupCount = this.groupingService.teamsCount;
  protected useDriver = this.groupingService.useDriver;

  protected teams$ = this.groupingService.teams$;
  protected personsCount$ = this.personService.personsCount$;


  protected onSubmit() {
    this.groupingService.teamsCount = this.groupCount;
    this.groupingService.useDriver = this.useDriver;
  }


  protected onReset() {
    this.groupingService.resetTeams();
    this.groupCount = this.groupingService.teamsCount;
  }
}
