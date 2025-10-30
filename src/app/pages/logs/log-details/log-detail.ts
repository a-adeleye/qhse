import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { SharePointService } from '@shared/services/sharepoint/sharepoint.service';
import { Loading } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-log-detail',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    CommonModule,
    Loading,
  ],
  templateUrl: './log-detail.html',
  styleUrl: './log-detail.scss'
})
export class LogDetailComponent implements OnInit {
  log?: any;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sharepointService = inject(SharePointService);
  loading = true;
  isLocal = false;
  siteUsers: any[] = [];
  isOnline = navigator.onLine;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadSiteUsers();
    this.loadLogDetail(id);
  }

  loadSiteUsers() {
    this.loading = true;
    this.sharepointService.getSiteUsers().subscribe({
      next: (res: any) => {
        this.siteUsers = res;
      },
      error: (error:any) => {
        console.error('Error loading site users:', error);
      }
    });
  }

  loadLogDetail(id: string) {
    if (!id) return;

    this.loading = true;

    if (this.isOnline) {
      this.sharepointService.getListItemById('Airside - FBO Vehicle Daily Inspection Checklist', +id).subscribe({
        next: (res: any) => {
          this.log = { ...res.d, isLocal: false };
          this.isLocal = false;
          this.loading = false;
          console.log('Loaded log from SharePoint:', this.log);
        },
        error: (error) => {
          console.error('Error loading log detail from SharePoint, trying local storage:', error);
          this.loadFromLocalStorage(id);
        }
      });
    } else {
      this.loadFromLocalStorage(id);
    }
  }

  private loadFromLocalStorage(id: string) {
    const localLog = this.getLogFromLocalStorage(id);
    if (localLog) {
      this.log = { ...localLog, isLocal: true };
      this.isLocal = true;
      this.loading = false;
      console.log('Loaded log from local storage:', this.log);
    } else {
      this.loading = false;
      console.log('Log not found in local storage');
    }
  }

  private getLogFromLocalStorage(id: string): any {
    try {
      const stored = localStorage.getItem('pendingChecklistSubmissions');
      if (!stored) return null;

      const pendingSubmissions: any[] = JSON.parse(stored);
      const localLog = pendingSubmissions.find(item => item.ID === id);

      return localLog || null;
    } catch (error) {
      console.error('Error reading from local storage:', error);
      return null;
    }
  }

  goBack() {
    this.router.navigate(['/logs']).then();
  }

  getDoneByName(): string {
    const doneById = this.log.DoneById;
    const user = this.siteUsers.find(u => u.Id === doneById);

    if(this.isLocal) return this.log.UserName;

    if (user) return user.Title || user.LoginName || `User ${doneById}`;

    return `User ${doneById}`;
  }

  getQuestionsWithAnswers(log: any): any[] {
    const questions = [
      { key: 'Isthevehiclefreefromvisibledamag', text: 'Is the vehicle free from visible damage?' },
      { key: 'IstheJetexbrandingplateavailable', text: 'Is the Jetex branding plate available?' },
      { key: 'Isthevehiclecleanfromboththeexte', text: 'Is the vehicle clean from both the exterior and interior?' },
      { key: 'Isthevehiclefreefromanyleaks_x00', text: 'Is the vehicle free from any leaks?' },
      { key: 'Isthetirepressureadequateforuse_', text: 'Is the tire pressure adequate for use?' },
      { key: 'Isthereanyunevenwear_x002c_cuts_', text: 'Is there any uneven wear, cuts, or damage to tires?' },
      { key: 'Isthevehiclefreefromanyforeignob', text: 'Is the vehicle free from any foreign objects?' },
      { key: 'Isthefireextinguisheravailablean', text: 'Is the fire extinguisher available and valid?' },
      { key: 'IsAVPavailableandvalid_x003f_', text: 'Is AVP available and valid?' },
      { key: 'Isthevehiclefreefromanywarningli', text: 'Is the vehicle free from any warning lights?' },
      { key: 'Arethevehicle_x2019_sseatbeltsan', text: 'Are the vehicle\'s seatbelts and fixtures in good condition?' },
      { key: 'Isthecamerainworkingcondition_x0', text: 'Is the camera in working condition?' },
      { key: 'Arethesafetybeaconlightandhornin', text: 'Are the safety beacon light and horn in working condition?' },
      { key: 'Arethefootbrakeandparkingbrakein', text: 'Are the foot brake and parking brake in working condition?' },
      { key: 'Are_x0020_the_x0020_first_x0020_', text: 'Are the first aid kits available and stocked?' },
      { key: 'IstheAnkerbatterypercentagesuffi', text: 'Is the Anker battery percentage sufficient?' }
    ];

    return questions.map(q => ({
      ...q,
      answer: log[q.key]
    }));
  }


  getOverallStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'all ok':
        return 'all-ok';
      case 'needs attention':
        return 'needs-attention';
      case 'unserviceable':
        return 'unserviceable';
      default:
        return 'not-specified';
    }
  }

  getAnswerClass(answer: string): string {
    if (answer === 'Yes') return 'yes';
    if (answer === 'No') return 'no';
    return 'not-answered';
  }

  hasAdditionalInfo(log: any): boolean {
    return !!(log.Created || log.Modified || log.GUID);
  }

  getSyncStatus(): string {
    return this.isLocal ? 'Pending Sync' : 'Synced';
  }

  getSyncStatusClass(): string {
    return this.isLocal ? 'local' : 'synced';
  }
}
