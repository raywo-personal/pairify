import {effect, inject, Injectable, signal} from '@angular/core';
import {Person} from '../models/person.model';
import {BehaviorSubject, map} from 'rxjs';
import {SortOrder, stringCompare} from '../../shared/helper/comparison';
import {EventBusService} from '../../shared/event-bus/event-bus.service';
import {createBusEvent, EventType} from '../../shared/event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private eventBus = inject(EventBusService);

  private personsSubject = new BehaviorSubject<Person[]>([]);
  public readonly persons$ = this.personsSubject.asObservable();

  private filteredPersonsSubject = new BehaviorSubject<Person[]>([]);
  public readonly filteredPersons$ = this.filteredPersonsSubject.asObservable();

  public readonly personsCount$ = this.persons$
    .pipe(
      map(persons => persons.length)
    );
  public readonly filteredPersonsCount$ = this.filteredPersons$
    .pipe(
      map(persons => persons.length)
    )

  public readonly nameSortOrder = signal<SortOrder>("asc");
  public readonly nameFilter = signal<string>("");


  constructor() {
    effect(() => {
      this.sortPersons(this.nameSortOrder());
    });
  }


  public addPerson(person: Person, isRestore = false) {
    this.persons = this.persons.concat(person);
    this.filteredPersons = this.filteredPersons.concat(person);

    if (!isRestore) this.eventBus.emit(createBusEvent(EventType.PERSON_CREATED, person));
  }


  public updatePerson(person: Person) {
    this.persons = this.persons.map(p => p.id === person.id ? person : p);
    this.filteredPersons = this.filteredPersons.map(p => p.id === person.id ? person : p);

    this.eventBus.emit(createBusEvent(EventType.PERSON_UPDATED, person));
  }


  public deleteAll() {
    this.persons.forEach(p => this.removePerson(p));

    this.eventBus.emit(createBusEvent(EventType.PERSONS_RESET));
  }


  public removePerson(person: Person) {
    this.persons = this.persons.filter(p => p.id !== person.id);
    this.filteredPersons = this.filteredPersons.filter(p => p.id !== person.id);

    this.eventBus.emit(createBusEvent(EventType.PERSON_DELETED, person));
  }


  private sortPersons(nameSortOrder: SortOrder) {
    this.filterPersons(this.nameFilter());

    this.filteredPersons.sort((a, b) => {
      return stringCompare(a.name, b.name, nameSortOrder);
    });
  }


  private filterPersons(nameFilter: string) {
    if (nameFilter === "") {
      this.filteredPersons = [...this.persons];
      return;
    }

    this.filteredPersons = this.persons
      .filter(p => nameFilter === "" || p.name.toLowerCase().includes(nameFilter.toLowerCase()));
  }


  public get persons(): Person[] {
    return this.personsSubject.getValue();
  }


  private set persons(value: Person[]) {
    this.personsSubject.next(value);
  }


  private get filteredPersons(): Person[] {
    return this.filteredPersonsSubject.getValue();
  }


  private set filteredPersons(value: Person[]) {
    this.filteredPersonsSubject.next(value);
  }
}
