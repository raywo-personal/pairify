import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportFullscreenComponent} from './import-fullscreen.component';


describe('ImportFullscreenComponent', () => {
  let component: ImportFullscreenComponent;
  let fixture: ComponentFixture<ImportFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportFullscreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
