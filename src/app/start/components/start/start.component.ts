import {Component, inject} from '@angular/core';
import {PersonService} from '../../../persons/services/person.service';
import {AsyncPipe} from '@angular/common';
import {ClaimComponent} from '../claim/claim.component';
import {GroupingComponent} from '../../../grouping/components/grouping/grouping.component';


@Component({
  selector: 'app-start',
  imports: [
    AsyncPipe,
    ClaimComponent,
    GroupingComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  private readonly personService = inject(PersonService);

  protected readonly personsCount$ = this.personService.personsCount$;

}
