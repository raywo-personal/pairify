import {Component, effect, inject, input, model, OnInit, output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject, switchMap} from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {PersonService} from '../../services/person.service';


@Component({
  selector: 'app-person-search',
  imports: [
    FormsModule,
    NgbTypeahead
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent implements OnInit {

  private personService = inject(PersonService);

  private focus$ = new Subject<string>();
  private click$ = new Subject<string>();

  @ViewChild('instance', {static: true})
  private instance!: NgbTypeahead;

  public source = input.required<Observable<string[]>>();
  public termUpdated = output<string>();

  protected searchTerm = model<string>("");

  protected search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopups$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    const persons$ = this.source();

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopups$).pipe(
      switchMap(term => {
        return persons$.pipe(
          map((persons) => {
            if (term === '') {
              return persons.slice(0, 10)
            } else {
              return persons
                .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
                .slice(0, 10)
            }
          })
        );
      })
    );
  };


  constructor() {
    effect(() => {
      const term = this.searchTerm();
      this.personService.nameFilter.set(term);
      this.termUpdated.emit(term);
    })
  }


  public ngOnInit() {
    this.searchTerm.set(this.personService.nameFilter());
  }


  protected onFocus(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    this.focus$.next(target.value);
  }


  protected onClick(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    this.click$.next(target.value)
  }
}
