import {inject, Injectable} from '@angular/core';
import {createTeam, Team} from '../models/Team.model';
import {PersonService} from '../../persons/services/person.service';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroupingService {

  private _teamsCount = 0;
  private _useDriver = false;

  private personService = inject(PersonService);
  private teamsSubject = new BehaviorSubject<Team[]>([]);

  public readonly teams$ = this.teamsSubject.asObservable();


  constructor() {
    this.createTeams();
  }


  public get teamsCount(): number {
    return this._teamsCount;
  }


  public set teamsCount(value: number) {
    this._teamsCount = value;
    this.createTeams();
  }


  public get useDriver(): boolean {
    return this._useDriver;
  }


  public set useDriver(value: boolean) {
    this._useDriver = value;
    this.createTeams();
  }


  public createTeams() {
    const persons = this.personService.persons;
    const memberCount = Math.ceil(persons.length / this.teamsCount);
    const newCount = Math.ceil(persons.length / memberCount);
    console.log(
      `Creating ${newCount} teams with ${memberCount} members each. Use driver: ${this.useDriver}`)
    const shuffledPersons = [...persons].sort(() => Math.random() - 0.5);

    this.teams = Array(newCount)
      .fill(0)
      .map((_, i) => {
        const teamMembers = shuffledPersons.splice(0, memberCount);
        const driver = teamMembers[Math.floor(Math.random() * teamMembers.length)];
        const name = `Team ${i + 1}`;

        return createTeam(name, teamMembers, this.useDriver ? driver : undefined);
      });
  }


  private get teams(): Team[] {
    return this.teamsSubject.getValue();
  }


  private set teams(value: Team[]) {
    this.teamsSubject.next(value);
  }
}
