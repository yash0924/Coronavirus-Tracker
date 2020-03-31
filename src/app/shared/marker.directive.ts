import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMarker]'
})
export class MarkerDirective {

  constructor(private eleRef :  ElementRef) { 
    this.eleRef.nativeElement.style.color = 'yellow';
  }

}
