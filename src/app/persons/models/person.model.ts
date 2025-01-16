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
