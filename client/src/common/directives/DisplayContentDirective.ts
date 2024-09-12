import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appDisplayContents]'
})
export class DisplayContentsDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'contents');
  }
}
