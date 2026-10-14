import {TestBed} from '@angular/core/testing';
import {ElementRef} from "@angular/core";
import {AutofocusDirective} from './autofocus.directive';


describe('AutofocusDirective', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [{provide: ElementRef, useValue: new ElementRef(document.createElement("input"))}]
    });
    const directive = TestBed.runInInjectionContext(() => new AutofocusDirective());
    expect(directive).toBeTruthy();
  });
});
