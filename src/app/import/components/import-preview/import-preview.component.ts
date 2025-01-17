import {Component, input, output} from '@angular/core';
import {Observable} from 'rxjs';
import {Person} from '../../../persons/models/person.model';
import {AsyncPipe} from '@angular/common';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';


@Component({
  selector: 'app-import-preview',
  imports: [
    AsyncPipe,
    PersonViewComponent
  ],
  templateUrl: './import-preview.component.html',
  styleUrl: './import-preview.component.scss'
})
export class ImportPreviewComponent {

  public persons$ = input<Observable<Person[]>>();
  public importCancelled = output();
  public importConfirmed = output();


  protected onImport() {
    this.importConfirmed.emit();
  }


  protected onCancel() {
    this.importCancelled.emit();
  }
}
