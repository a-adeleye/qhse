import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {animate, AnimationBuilder, style} from '@angular/animations';

@Directive({
  selector: '[appListAnimation]'
})
export class ListAnimationDirective implements AfterViewInit, OnDestroy {
  private observer!: MutationObserver;
  private animated = new WeakSet<HTMLElement>();

  constructor(private el: ElementRef, private builder: AnimationBuilder) {
  }

  ngAfterViewInit() {
    this.animateExistingChildren();
    this.observer = new MutationObserver(() => {
      setTimeout(() => {
        const children = Array.from(this.el.nativeElement.children) as HTMLElement[];
        children.forEach((child, index) => {
          if (!this.animated.has(child)) {
            child.style.opacity = '0';
            child.style.transform = 'translateY(-10px)';
            setTimeout(() => {
              const animation = this.builder.build([
                animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
              ]);
              animation.create(child).play();
              this.animated.add(child);
            }, index * 100);
          }
        });
      });
    });

    this.observer.observe(this.el.nativeElement, {childList: true});
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  private animateExistingChildren() {
    setTimeout(() => {
      const children = Array.from(this.el.nativeElement.children) as HTMLElement[];
      children.forEach((child, index) => {
        if (!this.animated.has(child)) {
          child.style.opacity = '0';
          child.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            const animation = this.builder.build([
              animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
            ]);
            animation.create(child).play();
            this.animated.add(child);
          }, index * 100);
        }
      });
    });
  }

}
