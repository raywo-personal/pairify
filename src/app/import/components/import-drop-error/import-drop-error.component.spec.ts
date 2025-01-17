import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportDropErrorComponent} from './import-drop-error.component';


describe('ImportDropErrorComponent', () => {
  let component: ImportDropErrorComponent;
  let fixture: ComponentFixture<ImportDropErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportDropErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportDropErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
