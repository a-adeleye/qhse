import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {MatDrawerContent} from '@angular/material/sidenav';

@Directive({
  selector: '[appScrollShadow]',
  standalone: true
})
export class ScrollShadowDirective implements OnInit, OnDestroy {
  @Input() scrollTarget: MatDrawerContent | undefined;
  private scrollListener: (() => void) | undefined;
  private readonly threshold = 50;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    const nativeElement = this.scrollTarget!['elementRef'].nativeElement;
    this.scrollListener = this.renderer.listen(nativeElement, 'scroll', () =>
      this.onScroll(nativeElement)
    );
  }

  private onScroll(nativeElement: HTMLElement) {
    const scrollTop = nativeElement.scrollTop;
    if (scrollTop > this.threshold) {
      this.renderer.addClass(this.el.nativeElement, 'shadow-sm');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'shadow-sm');
    }
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }
}
