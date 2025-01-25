import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportHintComponent} from './import-hint.component';


describe('ImportHintComponent', () => {
  let component: ImportHintComponent;
  let fixture: ComponentFixture<ImportHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportHintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
