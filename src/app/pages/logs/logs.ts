import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DatePipe} from '@angular/common';
import {LogsService} from '@shared/services/logs/logs.service';
import {SharePointService} from '@shared/services/sharepoint/sharepoint.service';
import {InternetConnectivityService} from '@shared/services/internet-connectivity/internet-connectivity.service';

@Component({
  selector: 'app-logs',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    DatePipe,
  ],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class LogsComponent implements OnInit {
  displayedColumns = ['id', 'title','createdBy', 'createdAt','overallCondition' ,'action'];
  data: any[] = [];
  loading = true;
  isOnline = true;
  siteUsers: any[] = [];
  private connectivityService = inject(InternetConnectivityService);

  constructor(
    private logsSvc: LogsService,
    private router: Router,
    private sharepointService: SharePointService
  ) {}

  async ngOnInit() {
    await this.setupOnlineStatusListeners();
    await this.loadSiteUsers();
    await this.loadLogs();
  }

  private async setupOnlineStatusListeners() {
    this.isOnline = await this.connectivityService.checkInternetConnection();
    this.connectivityService.onConnectionChange((online: boolean) => {
      this.isOnline = online;
      console.log('Connectivity changed:', online ? 'Online' : 'Offline');
    });
  }

  private async loadSiteUsers() {
    if (this.isOnline) {
      try {
        this.siteUsers = await this.sharepointService.getSiteUsers().toPromise();
        console.log('Loaded site users:', this.siteUsers);
      } catch (error) {
        console.error('Error loading site users:', error);
        this.siteUsers = [];
      }
    }
  }

  getUserName(userId: number): string {
    if (!userId || !this.siteUsers || this.siteUsers.length === 0) {
      return 'Unknown User';
    }

    const user = this.siteUsers.find(u => u.Id === userId);
    return user ? user.Title : `User (${userId})`;
  }

  async loadLogs() {
    this.loading = true;

    this.isOnline = await this.connectivityService.checkInternetConnection();
    if (this.isOnline) {
      this.sharepointService.getListItems('Airside - FBO Vehicle Daily Inspection Checklist').subscribe({
        next: (res) => {
          const sharepointData = res.d.results.map((item: any) => ({
            ...item,
            isLocal: false,
            syncStatus: 'synced',
            createdByName: this.getUserName(item.DoneById)
          }));

          const localData = this.getLocalSubmissions().map((item: any) => ({
            ...item,
            isLocal: true,
            syncStatus: 'pending',
            createdByName: item.UserName || 'Local User'
          }));

          this.data = [...localData, ...sharepointData].sort((a, b) =>
            new Date(b.Created).getTime() - new Date(a.Created).getTime()
          );

          this.loading = false;
        },
        error: (error) => {
          console.log('Error loading from SharePoint, showing local data only:', error);
          this.loadLocalDataOnly();
        }
      });
    } else {
      this.loadLocalDataOnly();
    }
  }

  private loadLocalDataOnly() {
    this.data = this.getLocalSubmissions().map((item: any) => ({
      ...item,
      isLocal: true,
      syncStatus: 'pending',
      createdByName: item.userName || 'Local User'
    }));
    this.loading = false;
  }

  private getLocalSubmissions(): any[] {
    const stored = localStorage.getItem('pendingChecklistSubmissions');
    return stored ? JSON.parse(stored) : [];
  }

  goBack() {
    this.router.navigate(['/']).then();
  }

  open(row: any) {
    this.router.navigate(['/logs', row.ID]).then();
  }

  async retrySubmission(row: any) {
    this.isOnline = await this.connectivityService.checkInternetConnection();
    if (row.isLocal && this.isOnline) {
      this.loading = true;
      const { isLocal, syncStatus, ID, Modified, Created, UserName, createdByName, ...submissionData } = row;

      this.sharepointService.addListItem('Airside - FBO Vehicle Daily Inspection Checklist', submissionData)
        .subscribe({
          next: (res) => {
            console.log('Successfully resubmitted:', res);
            this.removeFromLocalStorage(row.ID);
            this.loadLogs();
            this.logsSvc.openSnackBar('Checklist synced successfully!', 'success');
          },
          error: (error) => {
            console.log('Resubmission failed:', error);
            this.loading = false;
            this.logsSvc.openSnackBar('Sync failed. Will retry later.', 'error');
          }
        });
    }
  }

  private removeFromLocalStorage(id: string): void {
    const pendingSubmissions = this.getLocalSubmissions();
    const updatedSubmissions = pendingSubmissions.filter((item: any) => item.ID !== id);
    localStorage.setItem('pendingChecklistSubmissions', JSON.stringify(updatedSubmissions));
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

  hasPendingSubmissions(): boolean {
    return this.data.some(item => item.isLocal);
  }

  getPendingCount(): number {
    return this.data.filter(item => item.isLocal).length;
  }

  syncAll(): void {
    if (this.isOnline) {
      const pendingItems = this.data.filter(item => item.isLocal);
      pendingItems.forEach(item => this.retrySubmission(item));
    }
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
}
