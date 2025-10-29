import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe, NgForOf} from '@angular/common';
import {LogEntry, LogsService} from '@shared/services/logs/logs.service';
import {SharePointService} from '@shared/services/sharepoint/sharepoint.service';

@Component({
  selector: 'app-logs',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DatePipe,
    NgForOf,
  ],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class LogsComponent {
  displayedColumns = ['id', 'title', 'createdAt', 'summary', 'action'];
  data: any[] = [];
  loading = false;

  constructor(
    private logsSvc: LogsService,
    private router: Router,
    private sharepointService: SharePointService
  ) {
    this.loadLogs();
  }

  loadLogs() {
    this.loading = true;
    this.sharepointService.getListItems('Airside - FBO Vehicle Daily Inspection Checklist').subscribe({
      next: (res) => {
        this.data = res.d.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading logs:', error);
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']).then(); // Adjust the route as needed
  }

  open(row: LogEntry) {
    this.router.navigate(['/logs', row.id]).then();
  }

  yesCount(row: any): string {
    const choiceKeys = [
      'Isthevehiclefreefromvisibledamag',
      'IstheJetexbrandingplateavailable',
      'Isthevehiclecleanfromboththeexte',
      'Isthevehiclefreefromanyleaks_x00',
      'Isthetirepressureadequateforuse_',
      'Isthereanyunevenwear_x002c_cuts_',
      'Isthevehiclefreefromanyforeignob',
      'Isthefireextinguisheravailablean',
      'IsAVPavailableandvalid_x003f_',
      'Isthevehiclefreefromanywarningli',
      'Arethevehicle_x2019_sseatbeltsan',
      'Isthecamerainworkingcondition_x0',
      'Arethesafetybeaconlightandhornin',
      'Arethefootbrakeandparkingbrakein',
      'Are_x0020_the_x0020_first_x0020_'
    ];

    let yes = 0;
    const total = choiceKeys.length;

    for (const key of choiceKeys) {
      if (row[key] === 'Yes') yes++;
    }

    return `${yes} / ${total} Yes`;
  }
}
