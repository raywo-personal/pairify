import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-claim',
  imports: [
    RouterLink
  ],
  templateUrl: './claim.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './claim.component.scss'
})
export class ClaimComponent {
}
