import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class Loading {
  @Input() backgroundColor = 'rgba(0, 0, 0, 0.4)';
  @Input() textColor = 'text-light';
}
