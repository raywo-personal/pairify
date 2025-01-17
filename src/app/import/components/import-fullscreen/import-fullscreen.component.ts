import {Component, inject} from '@angular/core';
import {ImportPreviewComponent} from '../import-preview/import-preview.component';
import {DropError} from '../../models/drop-error.type';
import {ImportDropErrorComponent} from '../import-drop-error/import-drop-error.component';
import {DataFormatError} from '../../models/data-format-error.model';
import {Observable, of} from 'rxjs';
import {ImportService} from '../../services/import.service';


@Component({
  selector: 'app-import-fullscreen',
  imports: [
    ImportPreviewComponent,
    ImportDropErrorComponent
  ],
  templateUrl: './import-fullscreen.component.html',
  styleUrl: './import-fullscreen.component.scss'
})
export class ImportFullscreenComponent {

  private importService = inject(ImportService);

  protected readonly allowedFileTypes = ["application/json", "text/plain"];
  protected file: File | null = null;
  protected fileType: "json" | "txt" | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected contentToImport$: Observable<any[]> = of([]);

  protected visible = false
  protected showPreview = false;
  protected dropError: DropError = null;


  protected onImportCancelled() {
    this.reset();
  }


  protected onImportConfirmed() {

  }


  protected onDragOver(dragEvent: DragEvent) {
    dragEvent.preventDefault();

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

    this.handleFile(files[0])
  }


  private handleFile(file: File) {
    if (file.type && !this.allowedFileTypes.includes(file.type)) {
      this.onDropError("unsupported");
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
      this.onDropError("empty");
      return;
    }

    if (this.fileType === "txt") {
      this.contentToImport$ = of(this.importService.personsToImportFromTxt(data as string));
      this.showPreview = true;
      return;
    }

    if (this.fileType === "json") {
      try {
        const json = JSON.parse(data as string);
        this.contentToImport$ = of(this.importService.contentToImportFromJson(json));
        this.showPreview = true
      } catch (e) {
        if (e instanceof DataFormatError) {
          this.onDropError("invalidFormat");
        } else {
          this.onDropError("invalidJSON");
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


  private onDropError(error: DropError) {
    this.dropError = error;
    setTimeout(() => this.reset(), 3000);
  }


  private reset() {
    this.visible = false;
    this.dropError = null;
  }
}
