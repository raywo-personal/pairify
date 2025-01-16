import {Component, input} from '@angular/core';
import {Person} from '../../models/person.model';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';


@Component({
  selector: 'app-person-view',
  imports: [
    DeleteButtonComponent
  ],
  templateUrl: './person-view.component.html',
  styleUrl: './person-view.component.scss'
})
export class PersonViewComponent {

  public person = input.required<Person>();

}
