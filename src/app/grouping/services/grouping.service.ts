import {inject, Injectable} from '@angular/core';
import {createTeam, Team} from '../models/Team.model';
import {PersonService} from '../../persons/services/person.service';
import {BehaviorSubject} from 'rxjs';
import {createBusEvent, EventType} from '../../shared/event-bus/event.model';
import {EventBusService} from '../../shared/event-bus/event-bus.service';


@Injectable({
  providedIn: 'root'
})
export class GroupingService {

  private _teamsCount = 0;
  private _useDriver = false;

  private eventBus = inject(EventBusService);
  private personService = inject(PersonService);
  private teamsSubject = new BehaviorSubject<Team[]>([]);

  public readonly teams$ = this.teamsSubject.asObservable();


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


  /**
   * Creates a set of teams based on the number of persons and specified
   * team count.
   *
   * Ensures an even distribution of members with any remainder distributed
   * among the teams. To guarantee randomness the persons array is shuffled
   * before the teams are created. If a driver is requested one random person
   * is selected from the team members.
   */
  public createTeams() {
    const persons = this.personService.persons;
    const numPersons = persons.length;
    // Minimum number per team
    const baseMemberCount = Math.floor(numPersons / this.teamsCount);
    // Number of remaining people that need to be distributed among teams
    const extraMembers = numPersons % this.teamsCount;
    // Randomly shuffle people to ensure the distribution is random
    const shuffledPersons = [...persons].sort(() => Math.random() - 0.5);

    this.teams = Array(this.teamsCount)
      .fill(0)
      .map((_, i) => {
        // Anzahl der Mitglieder für das jeweilige Team berechnen
        const teamMemberCount = baseMemberCount + (i < extraMembers ? 1 : 0);
        const teamMembers = shuffledPersons.splice(0, teamMemberCount);
        const driver = teamMembers[Math.floor(Math.random() * teamMembers.length)];
        const name = `Team ${i + 1}`;
        return createTeam(name, teamMembers, this.useDriver ? driver : undefined);
      });

    this.eventBus.emit(createBusEvent(EventType.TEAMS_CREATED));
  }


  public resetTeams() {
    this.teams = [];
    this._teamsCount = 1;
    this.eventBus.emit(createBusEvent(EventType.TEAMS_RESET));
  }


  public loadTeams(teams: Team[], useDriver: boolean) {
    const count = teams.length === 0 ? 1 : teams.length;
    this.teams = teams;
    this._teamsCount = count;
    this._useDriver = useDriver;
  }


  public get teams(): Team[] {
    return this.teamsSubject.getValue();
  }


  private set teams(value: Team[]) {
    this.teamsSubject.next(value);
  }
}
