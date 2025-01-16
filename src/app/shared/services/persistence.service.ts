import {inject, Injectable} from '@angular/core';
import {PersonService} from '../../persons/services/person.service';
import {Person} from '../../persons/models/person.model';


@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private readonly appPrefix = 'pairify';
  private readonly personsKey = `${this.appPrefix}-personsKey`;

  private personService = inject(PersonService);


  public readAllData() {
    this.readPersons();
  }


  public saveAllData() {
    this.savePersons();
  }


  public readPersons() {
    const rawPersons = localStorage.getItem(this.personsKey) || "[]";
    const persons = JSON.parse(rawPersons) as Person[];

    persons.forEach(person => {
      this.personService.addPerson(person, true);
    });
  }


  public savePersons() {
    localStorage.setItem(this.personsKey, JSON.stringify(this.personService.persons));
  }

}
