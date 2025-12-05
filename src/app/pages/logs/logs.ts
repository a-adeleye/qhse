import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InspectionLogs} from '@pages/logs/inspection-logs/inspection-logs';

@Component({
  selector: 'app-logs',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    InspectionLogs,
  ],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class Logs {
  route = inject(ActivatedRoute);
  listName = '';

  constructor() {
    this.listName = this.route.snapshot.paramMap.get('list') ?? '';
  }
}
