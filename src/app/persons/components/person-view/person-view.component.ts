import {Component, input, model, output} from '@angular/core';
import {Person} from '../../models/person.model';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';
import {PersonEditComponent} from '../person-edit/person-edit.component';


@Component({
  selector: 'app-person-view',
  imports: [
    DeleteButtonComponent,
    PersonEditComponent
  ],
  templateUrl: './person-view.component.html',
  styleUrl: './person-view.component.scss'
})
export class PersonViewComponent {

  public person = input.required<Person>();
  public editing = model<boolean>(false);
  public edited = output<Person>();
  public delete = output<Person>();
  public editCancelled = output<Person>();


  protected onEdit() {
    this.editing.set(true);
  }


  protected onDeleteConfirmed() {
    this.delete.emit(this.person());
  }


  protected onEditSaved(person: Person) {
    this.edited.emit(person);
    this.editing.set(false);
  }


  protected onEditCancelled() {
    this.editing.set(false);
    this.editCancelled.emit(this.person());
  }
}
