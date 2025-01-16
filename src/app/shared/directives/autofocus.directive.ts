import {AfterViewInit, Directive, ElementRef, inject} from '@angular/core';


@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {

  private hostElement = inject(ElementRef<HTMLElement>);


  public ngAfterViewInit() {
    this.hostElement.nativeElement.focus();
    this.hostElement.nativeElement.select();
    this.hostElement.nativeElement.scrollIntoView({behavior: "smooth", block: "nearest"});
  }
}
