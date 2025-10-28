import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appInput]'
})
export class AppInputDirective implements OnChanges {
  @Input() status!: string;

  constructor(private el: ElementRef) {
    this.el.nativeElement.classList.add('form-control');
    this.el.nativeElement.classList.add('form-control-lg');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['status']) {
      this.updateBorderColor();
    }
  }

  private updateBorderColor() {
    if (this.status === 'danger') {
      this.el.nativeElement.classList.add('invalid');
    } else if (this.status === 'basic') {
      this.el.nativeElement.classList.remove('invalid');
    }
  }
}
