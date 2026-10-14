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

  it('should cancel the import when Escape is pressed', () => {
    let cancelled = false;
    component.importCancelled.subscribe(() => cancelled = true);

    document.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape"}));

    expect(cancelled).toBe(true);
  });
});
