import {Component, input} from '@angular/core';
import {Team} from '../../models/Team.model';
import {Person} from '../../../persons/models/person.model';


@Component({
  selector: 'app-team-view',
  imports: [],
  templateUrl: './team-view.component.html',
  styleUrl: './team-view.component.scss'
})
export class TeamViewComponent {

  public team = input.required<Team>();


  protected isDriver(person: Person): boolean {
    return person.id === this.team().driver?.id;
  }
}
