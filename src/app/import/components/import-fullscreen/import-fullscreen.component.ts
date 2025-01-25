import {Component, inject, input, OnDestroy, output} from '@angular/core';
import {ImportPreviewComponent} from '../import-preview/import-preview.component';
import {DropError} from '../../models/drop-error.type';
import {ImportDropErrorComponent} from '../import-drop-error/import-drop-error.component';
import {ImportService} from '../../services/import.service';
import {EventBusService} from '../../../shared/event-bus/event-bus.service';
import {EventType} from '../../../shared/event-bus/event.model';
import {Subscription} from 'rxjs';
import {UploadService} from '../../services/upload.service';
import {Person} from '../../../persons/models/person.model';


@Component({
  selector: 'app-import-fullscreen',
  imports: [
    ImportPreviewComponent,
    ImportDropErrorComponent
  ],
  templateUrl: './import-fullscreen.component.html',
  styleUrl: './import-fullscreen.component.scss'
})
export class ImportFullscreenComponent implements OnDestroy {

  private readonly importService = inject(ImportService);
  private readonly uploadService = inject(UploadService);
  private readonly eventBus = inject(EventBusService);

  private subscriptions: Subscription[] = [];

  protected contentToImport: Person[] = [];
  protected visible = false
  protected showPreview = false;
  protected dropError: DropError = null;

  public allowedFileTypes = input.required<string[]>()
  public importConfirmed = output();
  public importCancelled = output();


  constructor() {
    this.subscriptions.push(
      this.eventBus.on(EventType.DROP_ERROR, (errorType) => {
        this.dropError = errorType as DropError;
      })
    );

    this.subscriptions.push(
      this.eventBus.on(EventType.TXT_FILE_UPLOADED, (persons) => {
        this.contentToImport = persons as Person[];
        this.showPreview = true;
        this.dropError = null;
      })
    );

    this.subscriptions.push(
      this.eventBus.on(EventType.JSON_FILE_UPLOADED, (persons) => {
        this.contentToImport = persons as Person[];
        this.showPreview = true;
        this.dropError = null;
      })
    );
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected onImportCancelled() {
    this.reset();
    this.importCancelled.emit();
  }


  protected onImportConfirmed() {
    this.importService.importPersons(this.uploadService.contentToImport);
    this.importConfirmed.emit();
  }


  protected onBackDropClick() {
    this.reset();
    this.importCancelled.emit();
  }


  protected onDragOver(dragEvent: DragEvent) {
    dragEvent.preventDefault();

    if (this.showPreview) {
      this.showPreview = false;
    }

    const dataTransfer = dragEvent.dataTransfer;

    if (!dataTransfer) return;

    this.visible = true;
    const types = dataTransfer?.types;

    if (types && types.includes("Files")) {
      dataTransfer.dropEffect = "copy";
    } else {
      dataTransfer.dropEffect = "none";
    }
  }


  protected onDragLeave() {
    this.visible = false;
  }


  protected onDrop(dragEvent: DragEvent) {
    dragEvent.preventDefault();

    const types = dragEvent.dataTransfer?.types;
    const files = dragEvent.dataTransfer?.files;

    if (!types || !types.includes("Files") || !files || files.length != 1) {
      this.onDropError("unsupported");
      return;
    }

    this.uploadService.handleFile(files[0])
  }


  private onDropError(error: DropError) {
    this.dropError = error;
    setTimeout(() => this.reset(), 3000);
  }


  private reset() {
    this.visible = false;
    this.dropError = null;
  }
}
