import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBacon]'
})
export class BaconDirective {
  ingredient = 'mayo';

  constructor(elem: ElementRef, renderer: Renderer2) {
      const bacon: any = renderer.createText('Jim Jam');
      renderer.appendChild(elem.nativeElement, bacon);
   }
}
