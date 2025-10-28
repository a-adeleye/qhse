import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {LogEntry, LogsService} from '@shared/services/logs/logs.service';

@Component({
  selector: 'app-logs',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,

  ],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class LogsComponent {
  displayedColumns = ['id', 'title', 'createdAt', 'summary', 'action'];
  data: LogEntry[] = [];

  constructor(private logsSvc: LogsService, private router: Router) {
    this.data = this.logsSvc.getLogs();
  }

  open(row: LogEntry) {
    this.router.navigate(['/logs', row.id]).then();
  }

  yesCount(row: LogEntry) {
    return `${row.answers.filter(a => a.answer).length} /  ${row.answers.length} Yes`
  }
}

