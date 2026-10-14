import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from "rxjs";

import {SearchFieldComponent} from './search-field.component';


describe('PersonSearchComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("source", of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
