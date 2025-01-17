import {Component, input, output} from '@angular/core';
import {Person} from '../../../persons/models/person.model';
import {PersonViewComponent} from '../../../persons/components/person-view/person-view.component';


@Component({
  selector: 'app-import-preview',
  imports: [
    PersonViewComponent
  ],
  templateUrl: './import-preview.component.html',
  styleUrl: './import-preview.component.scss'
})
export class ImportPreviewComponent {

  public persons = input<Person[]>();
  public importCancelled = output();
  public importConfirmed = output();


  protected onImport() {
    this.importConfirmed.emit();
  }


  protected onCancel() {
    this.importCancelled.emit();
  }
}
