import {Component, effect, input, output} from '@angular/core';
import {Person} from '../../models/person.model';
import {FormsModule} from '@angular/forms';
import {AutofocusDirective} from '../../../shared/directives/autofocus.directive';


@Component({
  selector: 'app-person-edit',
  imports: [
    FormsModule,
    AutofocusDirective
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent {

  public person = input.required<Person>();
  public saved = output<Person>();
  public cancelled = output();

  protected name = "";


  constructor() {
    effect(() => {
      this.name = this.person().name;
    });
  }


  protected onCancel() {
    this.cancelled.emit();
  }


  protected onSubmit() {
    const person = {...this.person()};
    person.name = this.name;

    this.saved.emit(person);
  }


  protected onKeyUp(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key !== "Esc") {
      this.cancelled.emit();
    }
  }
}
