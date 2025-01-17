import {Injectable} from '@angular/core';
import {createPerson, Person} from '../../persons/models/person.model';
import {DataFormatError} from '../models/data-format-error.model';
import {validateObject} from '../../shared/helper/validate-object';
import {dataValidator, ExportImportData} from '../models/export-import.model';


@Injectable({
  providedIn: 'root'
})
export class ImportService {

  public personsToImportFromTxt(data: string): Person[] {
    return data
      .trim()
      .split('\n')
      .map(name => createPerson(name));
  }


  public contentToImportFromJson(data: unknown): Person[] {
    if (!validateObject<ExportImportData>(data, dataValidator)) {
      throw new DataFormatError('Invalid data format');
    }

    return (data.data).map(p => {
      const person = createPerson(p.name);
      person.id = p.id;

      return person;
    });
  }
}
