import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from "@angular/router";

import {PersonListComponent} from './person-list.component';


describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonListComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
