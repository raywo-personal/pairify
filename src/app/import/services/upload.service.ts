import {inject, Injectable} from '@angular/core';
import {DataFormatError} from '../models/data-format-error.model';
import {Person} from '../../persons/models/person.model';
import {ImportService} from './import.service';
import {EventBusService} from '../../shared/event-bus/event-bus.service';
import {createBusEvent, EventType} from '../../shared/event-bus/event.model';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private readonly importService = inject(ImportService);
  private readonly eventBus = inject(EventBusService);
  private readonly allowedFileTypes = () => ["application/json", "text/plain"];

  private file: File | null = null;
  private fileType: "json" | "txt" | null = null;
  private _contentToImport: Person[] = [];


  public get contentToImport(): Person[] {
    return this._contentToImport;
  }


  public handleFile(file: File) {
    if (file.type && !this.allowedFileTypes().includes(file.type)) {
      this.eventBus.emit(createBusEvent(EventType.DROP_ERROR, "unsupported"))
      return;
    }

    this.setFileTypeFromFile(file);
    this.file = file;

    const reader = this.getFileReader();
    reader.readAsText(this.file);
  }


  private getFileReader(): FileReader {
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;
      this.handleReadData(data as string | undefined);
    };

    return reader;
  }


  private handleReadData(data: string | undefined) {
    if (!data) {
      this.eventBus.emit(createBusEvent(EventType.DROP_ERROR, "empty"))
      return;
    }

    if (this.fileType === "txt") {
      this._contentToImport = this.importService.personsToImportFromTxt(data as string);
      this.eventBus.emit(
        createBusEvent(EventType.TXT_FILE_UPLOADED, this._contentToImport)
      );
      return;
    }

    if (this.fileType === "json") {
      try {
        const json = JSON.parse(data as string);
        this._contentToImport = this.importService.contentToImportFromJson(json);
        this.eventBus.emit(
          createBusEvent(EventType.JSON_FILE_UPLOADED, this._contentToImport)
        );
      } catch (e) {
        if (e instanceof DataFormatError) {
          this.eventBus.emit(createBusEvent(EventType.DROP_ERROR, "invalidFormat"))
        } else {
          this.eventBus.emit(createBusEvent(EventType.DROP_ERROR, "invalidJSON"))
        }
      }
    }
  }


  private setFileTypeFromFile(file: File) {
    switch (file.type) {
      case "application/json":
        this.fileType = "json";
        break;
      case "text/plain":
        this.fileType = "txt";
        break;
      default:
        this.fileType = null;
    }
  }

}
