import {Component, input} from '@angular/core';
import {ImportError} from '../../models/import-error.type';


@Component({
  selector: 'app-import-drop-error',
  imports: [],
  templateUrl: './import-drop-error.component.html',
  styleUrl: './import-drop-error.component.scss'
})
export class ImportDropErrorComponent {

  public importError = input.required<ImportError>();

}
