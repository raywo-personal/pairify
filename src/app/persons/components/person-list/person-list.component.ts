import {Component, inject} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {PersonViewComponent} from '../person-view/person-view.component';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';
import {SearchFieldComponent} from '../person-search-field/search-field.component';
import {map} from 'rxjs';
import {PersonEditComponent} from '../person-edit/person-edit.component';
import {createPerson, Person} from '../../models/person.model';


@Component({
  selector: 'app-person-list',
  imports: [
    AsyncPipe,
    PersonViewComponent,
    DeleteButtonComponent,
    NgTemplateOutlet,
    SearchFieldComponent,
    PersonEditComponent
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent {

  private readonly personService = inject(PersonService);

  protected readonly filteredPersons$ = this.personService.filteredPersons$;
  protected readonly personsCount$ = this.personService.personsCount$;
  protected readonly filteredPersonsCount$ = this.personService.filteredPersonsCount$;
  protected readonly filterSource$ = this.filteredPersons$
    .pipe(map(persons => persons.map(p => p.name)));

  protected nameSortOrder = "asc";
  protected personToAdd?: Person;
  protected personToEdit?: Person;


  protected onAdd() {
    this.personToAdd = createPerson("");
  }


  protected onDeleteAll() {
    this.personService.deleteAll();
  }


  protected onSortByName() {
    switch (this.personService.nameSortOrder()) {
      case "asc":
        this.personService.nameSortOrder.set("desc");
        break;

      case "desc":
        this.personService.nameSortOrder.set("asc");
        break;
    }
  }


  protected onAddCancelled() {
    this.personToAdd = undefined;
  }


  protected onEditCancelled() {
    this.personToEdit = undefined;
  }


  protected onEditSaved(person: Person) {
    this.personService.addPerson(person);
    this.personToAdd = createPerson("");
  }


  protected onEdited(person: Person) {
    this.personService.updatePerson(person);
    this.personToEdit = undefined;
  }


  protected onEditPersonClick(person: Person) {
    this.personToEdit = person;
  }


  protected onEditPersonKeyup(person: Person, keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === "Space") {
      this.onEditPersonClick(person);
    }
  }


  protected onDeleted(person: Person) {
    this.personService.removePerson(person);
  }
}
