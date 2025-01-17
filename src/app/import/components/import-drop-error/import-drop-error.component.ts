import {Component, input} from '@angular/core';
import {DropError} from '../../models/drop-error.type';


@Component({
  selector: 'app-import-drop-error',
  imports: [],
  templateUrl: './import-drop-error.component.html',
  styleUrl: './import-drop-error.component.scss'
})
export class ImportDropErrorComponent {

  public dropError = input.required<DropError>();

}
