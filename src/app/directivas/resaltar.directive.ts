import { Directive,ElementRef,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  constructor(obj:ElementRef) {
    obj.nativeElement.style.backgroundColor= "yellow";

   }

}
