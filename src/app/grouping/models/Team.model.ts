import {Person} from '../../persons/models/person.model';


export interface Team {

  id: string;
  name: string;
  persons: Person[];
  driver?: Person;

}


export function createTeam(name: string, persons: Person[], driver?: Person): Team {
  return {
    id: crypto.randomUUID(),
    name,
    persons,
    driver
  };
}
