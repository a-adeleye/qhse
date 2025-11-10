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
import {AuthService} from '@shared/services/auth/auth.service';

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
  displayedColumns = ['id','title','createdAt','createdBy','overallCondition' ,'action'];
  data: any[] = [];
  loading = true;
  isOnline = true;
  siteUsers: any[] = [];
  private connectivityService = inject(InternetConnectivityService);
  authService = inject(AuthService);

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
      if (online) {
        window.location.reload();
      }
    });
  }

  private async loadSiteUsers() {
    if (this.isOnline) {
      try {
        this.siteUsers = await this.sharepointService.getSiteUsers().toPromise();
        // console.log('Loaded site users:', this.siteUsers);
      } catch (error: any) {
        console.log('Error loading site users:', error);
        this.siteUsers = [];
        this.sharepointService.logout(error);
      }
    }
  }

  async loadLogs() {
    this.loading = true;

    this.isOnline = await this.connectivityService.checkInternetConnection();
    if (this.isOnline) {
      this.sharepointService.getListItems('FBO Vehicle Daily Inspection Checklist').subscribe({
        next: (res) => {
          const sharepointData = res.d.results.map((item: any) => ({
            ...item,
            isLocal: false,
            syncing: false,
            createdByName: this.getUserName(item.DoneById)
          }));

          const localData = this.getLocalSubmissions().map((item: any) => ({
            ...item,
            isLocal: true,
            syncing: false,
            createdByName: item.UserName || 'Local User'
          }));

          this.data = [...localData, ...sharepointData].sort((a, b) =>
            new Date(b.Created).getTime() - new Date(a.Created).getTime()
          );

          this.loading = false;
        },
        error: (error) => {
          console.log('Error loading from SharePoint, showing local data only:', error);
          this.sharepointService.logout(error);
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
      syncing: false,
      createdByName: item.UserName || 'Local User'
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

  getUserName(userId: number): string {
    if (!userId || !this.siteUsers || this.siteUsers.length === 0) {
      return 'Unknown User';
    }

    const user = this.siteUsers.find(u => u.Id === userId);
    return user ? user.Title : `User (${userId})`;
  }

  open(row: any) {
    this.router.navigate(['/logs', row.ID]).then();
  }

  async retrySubmission(row: any) {
    this.isOnline = await this.connectivityService.checkInternetConnection();
    if (row.isLocal && this.isOnline) {
      row.syncing = true;

      try {
        const { isLocal, ID, Modified, Created, UserName, createdByName, attachments, syncing, ...submissionData } = row;
        submissionData.DoneById = this.authService.currentUser?.Id
        const sharepointItem = await this.submitFormData(submissionData);

        if (sharepointItem && sharepointItem.d.ID) {
          if (attachments && attachments.length > 0) {
            await this.uploadAttachments(sharepointItem.d.ID, attachments);
          }

          // Remove from local storage and update UI
          this.removeFromLocalStorage(row.ID);
          await this.loadLogs();
          this.logsSvc.openSnackBar('Checklist synced successfully!', 'success');
        }
      } catch (error) {
        console.error('Resubmission failed:', error);
        this.sharepointService.logout(error);
        // Remove syncing flag on error
        row.syncing = false;
        this.loading = false;
        this.logsSvc.openSnackBar('Sync failed.Retry later.', 'error');
      }
    }
  }

  private submitFormData(formData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sharepointService.addListItem('FBO Vehicle Daily Inspection Checklist', formData)
        .subscribe({
          next: (res) => {
            console.log('Successfully submitted form data:', res);
            resolve(res);
          },
          error: (error) => {
            console.error('Error submitting form data:', error);
            reject(error);
            this.sharepointService.logout(error);
          }
        });
    });
  }

  private async uploadAttachments(itemId: number, attachments: any[]): Promise<void> {
    const listName = 'FBO Vehicle Daily Inspection Checklist';
    const uploadPromises: Promise<any>[] = [];

    for (const attachment of attachments) {
      const uploadPromise = this.uploadSingleAttachment(listName, itemId, attachment);
      uploadPromises.push(uploadPromise);
    }

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);
    console.log('All attachment uploads completed for item:', itemId);
  }

  private uploadSingleAttachment(listName: string, itemId: number, attachment: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const file = this.base64ToFile(attachment.data, attachment.name, attachment.type);

      this.sharepointService.uploadAttachment(listName, itemId, file)
        .subscribe({
          next: (res) => {
            console.log(`Successfully uploaded attachment: ${attachment.name}`, res);
            resolve(res);
          },
          error: (error) => {
            console.error(`Failed to upload attachment: ${attachment.name}`, error);
            resolve(null);
          }
        });
    });
  }

  private base64ToFile(base64Data: string, fileName: string, mimeType: string): File {
    // Remove data URL prefix if present
    const base64WithoutPrefix = base64Data.includes('base64,')
      ? base64Data.split('base64,')[1]
      : base64Data;

    // Convert base64 to binary
    const byteCharacters = atob(base64WithoutPrefix);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
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

  async syncAll(): Promise<void> {
    if (this.isOnline) {
      const pendingItems = this.data.filter(item => item.isLocal);

      if (pendingItems.length === 0) {
        this.logsSvc.openSnackBar('No pending submissions to sync.', 'info');
        return;
      }

      pendingItems.forEach(item => item.syncing = true);
      for (const item of pendingItems) {
        await this.retrySubmission(item);
        console.log(`Syncing ${pendingItems.length} submissions...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (this.hasPendingSubmissions()) {
        this.logsSvc.openSnackBar('Some submissions failed to sync. Please try again.', 'warning');
      } else {
        this.logsSvc.openSnackBar('All submissions synced successfully!', 'success');
      }
    } else {
      this.logsSvc.openSnackBar('You are offline. Please check your internet connection.', 'error');
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

  isSyncAllDisabled(): boolean {
    return !this.isOnline || !this.hasPendingSubmissions();
  }

  isSyncing(item: any): boolean {
    return item.syncing === true;
  }
}
