import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe, NgFor, NgIf} from '@angular/common';
import {LogEntry, LogsService} from '@shared/services/logs/logs.service';

@Component({
  selector: 'app-log-detail',
  imports: [
    MatCardModule,
    MatIconModule,
    RouterLink,
    NgIf,
    NgFor,
    DatePipe,
  ],
  templateUrl: './log-detail.html',
  styleUrl: './log-detail.scss'
})
export class LogDetailComponent {
  log?: LogEntry;
  private route = inject(ActivatedRoute);
  private logsSvc = inject(LogsService);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.log = this.logsSvc.getLogById(id);
  }
}

