import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class Loading {
  @Input() backgroundColor = 'rgba(0, 0, 0, 0.4)';
  @Input() textColor = 'text-light';
}
