import {ObjectValidator, validateObject} from '../../shared/helper/validate-object';


export interface Person {

  id?: string;
  name: string;

}


export function createPerson(name: string): Person {
  return {
    id: crypto.randomUUID(),
    name
  }
}


export const personValidator: ObjectValidator<Person> = {
  id: (value: unknown) => typeof value === "string",
  name: (value: unknown) => typeof value === "string"
}


export function isPersonArray(value: unknown): value is Person[] {
  if (!value || !Array.isArray(value)) return false;

  return value.every(item => validateObject<Person>(item, personValidator));
}
