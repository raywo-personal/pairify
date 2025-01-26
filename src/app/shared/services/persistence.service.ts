import {inject, Injectable} from '@angular/core';
import {PersonService} from '../../persons/services/person.service';
import {Person} from '../../persons/models/person.model';
import {GroupingService} from '../../grouping/services/grouping.service';
import {Team} from '../../grouping/models/Team.model';


@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private readonly appPrefix = 'pairify';
  private readonly personsKey = `${this.appPrefix}-personsKey`;
  private readonly teamsKey = `${this.appPrefix}-teamsKey`;
  private readonly driverKey = `${this.appPrefix}-driverKey`;

  private personService = inject(PersonService);
  private groupingService = inject(GroupingService);


  public readAllData() {
    this.readPersons();
    this.readTeams();
  }


  public saveAllData() {
    this.savePersons();
    this.saveTeams();
  }


  public readPersons() {
    const rawPersons = localStorage.getItem(this.personsKey) || "[]";
    const persons = JSON.parse(rawPersons) as Person[];

    persons.forEach(person => {
      this.personService.addPerson(person, true);
    });
  }


  public readTeams() {
    const rawTeams = localStorage.getItem(this.teamsKey) || "[]";
    const teams = JSON.parse(rawTeams) as Team[];
    const rawUseDriver = localStorage.getItem(this.driverKey) || "false";
    const useDriver = JSON.parse(rawUseDriver) as boolean;

    this.groupingService.loadTeams(teams, useDriver);
  }


  public savePersons() {
    localStorage.setItem(this.personsKey, JSON.stringify(this.personService.persons));
  }


  public saveTeams() {
    localStorage.setItem(this.teamsKey, JSON.stringify(this.groupingService.teams));
    localStorage.setItem(this.driverKey, JSON.stringify(this.groupingService.useDriver));
  }

}
