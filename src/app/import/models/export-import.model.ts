import {ObjectValidator} from '../../shared/helper/validate-object';
import {isPersonArray, Person} from '../../persons/models/person.model';


export type ExportImportType = typeof ExportImportTypes[number];


export interface ExportImportData {
  type: "persons";
  data: Person[];
}


export const dataValidator: ObjectValidator<ExportImportData> = {
  type: (value: unknown) => isExportImportType(value),
  data: (value: unknown) => isValidDataType(value)
}


const ExportImportTypes = [
  "persons"
] as const;


function isExportImportType(value: unknown): value is ExportImportType {
  return ExportImportTypes.includes(value as ExportImportType);
}


function isValidDataType(value: unknown): value is ExportImportType {
  if (!value) return false;

  if (Array.isArray(value)) {
    return isPersonArray(value);
  }

  return false;
}
