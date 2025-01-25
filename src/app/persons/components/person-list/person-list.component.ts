import {AfterViewInit, Component, inject, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {PersonViewComponent} from '../person-view/person-view.component';
import {DeleteButtonComponent} from '../../../shared/components/delete-button/delete-button.component';
import {SearchFieldComponent} from '../person-search-field/search-field.component';
import {map, Subscription} from 'rxjs';
import {PersonEditComponent} from '../person-edit/person-edit.component';
import {createPerson, Person} from '../../models/person.model';
import {ImportFullscreenComponent} from '../../../import/components/import-fullscreen/import-fullscreen.component';
import {EventBusService} from '../../../shared/event-bus/event-bus.service';
import {EventType} from '../../../shared/event-bus/event.model';
import {NgbOffcanvas, NgbOffcanvasOptions} from '@ng-bootstrap/ng-bootstrap';
import {UploadService} from '../../../import/services/upload.service';
import {ImportPreviewComponent} from '../../../import/components/import-preview/import-preview.component';


@Component({
  selector: 'app-person-list',
  imports: [
    AsyncPipe,
    PersonViewComponent,
    DeleteButtonComponent,
    NgTemplateOutlet,
    SearchFieldComponent,
    PersonEditComponent,
    ImportFullscreenComponent,
    ImportPreviewComponent
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements AfterViewInit, OnDestroy {

  private readonly personService = inject(PersonService);
  private readonly uploadService = inject(UploadService);
  private readonly eventBus = inject(EventBusService);
  private readonly offcanvas = inject(NgbOffcanvas);

  private subscriptions: Subscription[] = [];

  protected contentToImport: Person[] = [];
  protected readonly allowedFileTypes = ["application/json", "text/plain"];

  protected readonly filteredPersons$ = this.personService.filteredPersons$;
  protected readonly personsCount$ = this.personService.personsCount$;
  protected readonly filteredPersonsCount$ = this.personService.filteredPersonsCount$;
  protected readonly filterSource$ = this.filteredPersons$
    .pipe(map(persons => persons.map(p => p.name)));

  protected nameSortOrder = "asc";
  protected personToAdd?: Person;
  protected personToEdit?: Person;

  protected isDraggingOver = false;
  protected readonly offcanvasTitle = $localize`:@@p.importPersons:Import persons`;

  @ViewChild("content")
  private content!: TemplateRef<unknown>;


  constructor() {
    this.subscriptions.push(
      this.eventBus.on(EventType.DRAG_OVER, () => {
        this.isDraggingOver = true;
      })
    );

    this.subscriptions.push(
      this.eventBus.on(EventType.DRAG_LEAVE, () => {
        this.isDraggingOver = false;
      })
    );

    this.subscriptions.push(
      this.eventBus.on(EventType.TXT_FILE_UPLOADED, (persons) => {
        this.contentToImport = persons as Person[];
      })
    );

    this.subscriptions.push(
      this.eventBus.on(EventType.JSON_FILE_UPLOADED, (persons) => {
        this.contentToImport = persons as Person[];
        console.log(
          "JSON_FILE_UPLOADED",
          this.contentToImport)
      })
    );
  }


  // TODO: Remove!
  public ngAfterViewInit() {
    this.openOffcanvas(this.content);
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected onAdd() {
    this.personToAdd = createPerson("");
  }


  protected onDeleteAll() {
    this.personService.deleteAll();
  }


  protected onSortByName() {
    switch (this.personService.nameSortOrder()) {
      case "asc":
        this.personService.nameSortOrder.set("desc");
        break;

      case "desc":
        this.personService.nameSortOrder.set("asc");
        break;
    }
  }


  protected onAddCancelled() {
    this.personToAdd = undefined;
  }


  protected onEditCancelled() {
    this.personToEdit = undefined;
  }


  protected onEditSaved(person: Person) {
    this.personService.addPerson(person);
    this.personToAdd = createPerson("");
  }


  protected onEdited(person: Person) {
    this.personService.updatePerson(person);
    this.personToEdit = undefined;
  }


  protected onEditPersonClick(person: Person) {
    this.personToEdit = person;
  }


  protected onEditPersonKeyup(person: Person, keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === "Space") {
      this.onEditPersonClick(person);
    }
  }


  protected onDeleted(person: Person) {
    this.personService.removePerson(person);
  }


  protected onImportConfirmed() {
    this.isDraggingOver = false;
  }


  protected onImportCancelled() {
    this.isDraggingOver = false;
  }


  protected onImportClick(content: TemplateRef<unknown>) {
    this.openOffcanvas(content);
  }


  protected onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.uploadService.handleFile(target.files![0]);
  }


  protected onCancel() {
    this.offcanvas.dismiss("cancelled");
  }


  protected onImport() {

  }


  private openOffcanvas(content: TemplateRef<unknown>) {
    const options: NgbOffcanvasOptions = {
      ariaLabelledBy: this.offcanvasTitle,
      position: "end",
      backdropClass: "offcanvas-backdrop"
    };

    this.offcanvas.open(content, options);
  }
}
