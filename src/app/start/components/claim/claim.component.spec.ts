import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClaimComponent} from './claim.component';


describe('AppClaimComponent', () => {
  let component: ClaimComponent;
  let fixture: ComponentFixture<ClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
