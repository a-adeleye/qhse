import {Component, inject, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Location} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {provideNativeDateAdapter} from '@angular/material/core';
import {SharePointService} from '@shared/services/sharepoint/sharepoint.service';
import {AuthService} from '@shared/services/auth/auth.service';
import {Loading} from '@shared/components/loading/loading.component';
import {LogsService} from '@shared/services/logs/logs.service';
import {InternetConnectivityService} from '@shared/services/internet-connectivity/internet-connectivity.service';
import {FleetNumberService} from '@shared/services/fleet-number/fleet-number.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.html',
  styleUrls: ['./start.scss'],
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    Loading,
  ]
})
export class Start implements OnInit, OnDestroy {
  sharepointService = inject(SharePointService);
  location = inject(Location);
  loading = false;
  isOnline = true;
  isSubmitting = false;
  private connectivitySubscription: any;
  allowMultiple = false;

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFiles: File[] = [];
  maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
  private fb = inject(FormBuilder);
  form: UntypedFormGroup = this.fb.group({});
  private authService = inject(AuthService);
  private logService = inject(LogsService);
  questions = [
    { id: "DateOfinspection", title: "Date Of inspection", type: "Date_and_Time", required: true },
    { id: "Vehicle_x0020_Fleet_x0020_Number", title: "Vehicle Fleet Number", type: "Custom_Choice", required: true },
    { id: "Kilometer_x0020_", title: "Kilometer", type: "Single_line_of_text", required: false },
    { id: "Isthevehiclefreefromvisibledamag", title: "Is the vehicle free from visible damage or signs of corrosion?", type: "Choice", required: true },
    { id: "IstheJetexbrandingplateavailable", title: "Is the Jetex branding plate available on both sides of the vehicle?", type: "Choice", required: true },
    { id: "Isthevehiclecleanfromboththeexte", title: "Is the vehicle clean from both the exterior and interior?", type: "Choice", required: true },
    { id: "Isthevehiclefreefromanyleaks_x00", title: "Is the vehicle free from any leaks?", type: "Choice", required: true },
    { id: "Isthetirepressureadequateforuse_", title: "Is the tire pressure adequate for use?", type: "Choice", required: true },
    { id: "Isthereanyunevenwear_x002c_cuts_", title: "Is there any uneven wear, cuts, or damage on the tires?", type: "Choice", required: true },
    { id: "Isthevehiclefreefromanyforeignob", title: "Is the vehicle free from any foreign object debris (FOD)?", type: "Choice", required: true },
    { id: "Isthefireextinguisheravailablean", title: "Is the fire extinguisher available and serviceable for use?", type: "Choice", required: true },
    { id: "IsAVPavailableandvalid_x003f_", title: "Is AVP available and valid?", type: "Choice", required: true },
    { id: "Isthevehiclefreefromanywarningli", title: "Is the vehicle free from any warning lights on the panel?", type: "Choice", required: true },
    { id: "Arethevehicle_x2019_sseatbeltsan", title: "Are the vehicle's seat belts and seats free from cuts and marks?", type: "Choice", required: true },
    { id: "Isthecamerainworkingcondition_x0", title: "Is the camera in working condition?", type: "Choice", required: true },
    { id: "Arethesafetybeaconlightandhornin", title: "Are the safety beacon light and horn in working condition?", type: "Choice", required: true },
    { id: "Arethefootbrakeandparkingbrakein", title: "Are the foot brake and parking brake in proper working condition?", type: "Choice", required: true },
    { id: "OverallCondition", title: "Overall Condition", type: "Condition", required: true },
    { id: "Shift", title: "Shift", type: "Shift", required: true },
    { id: "Are_x0020_the_x0020_first_x0020_", title: "Are the first aid kit/torch light available for use?", type: "Choice", required: true },
    { id: "IstheAnkerbatterypercentagesuffi", title: "Is the Anker battery percentage sufficient?", type: "BPS", required: true },
    { id: "Remarks", title: "Remarks", type: "multi_line_of_text", required: false },
  ];
  private connectivityService = inject(InternetConnectivityService);
  private fleetNumberService = inject(FleetNumberService);
  fleetNumbers: string[] = [];

  async ngOnInit() {
    const formGroupConfig: any = {};
    this.questions.forEach(q => {
      formGroupConfig[q.id] = [null, q.required ? Validators.required : null];
    });

    const date = new Date();
    this.form = this.fb.group(formGroupConfig);
    this.form.addControl('DoneById', new FormControl(this.authService.loadFromStorage()?.Id || 'current user', Validators.required));
    this.form.get('Title')?.setValue(this.generateTitle());
    this.form.get('DateOfinspection')?.setValue(date);

    this.isOnline = await this.connectivityService.checkInternetConnection();
    this.connectivityService.onConnectionChange((online: boolean) => {
      this.isOnline = online;
      console.log('Connectivity changed:', online ? 'Online' : 'Offline');
    });



    this.form.valueChanges.subscribe(() => {
      const remarks = this.form.get('Remarks');
      const anyNo = Object.keys(this.form.controls).some(key => {
        const value = this.form.get(key)?.value;
        return String(value).toLowerCase() === 'no';
      });

      if (anyNo) {
        remarks?.addValidators(Validators.required);
      } else {
        remarks?.clearValidators();
      }
      remarks?.updateValueAndValidity({ emitEvent: false });
    });


    this.fleetNumberService.getFleetNumbers().subscribe(numbers => {
      this.fleetNumbers = numbers;
    });

  }

  ngOnDestroy() {
    if (this.connectivitySubscription) {
      this.connectivitySubscription.unsubscribe();
    }
  }

  getCompletedCount(): number {
    const controls = Object.entries(this.form.controls)
      .filter(([key]) => key !== 'DoneById');

    return controls.filter(([_, control]: any) =>
      control.value !== null && control.value !== ''
    ).length;
  }

  getProgress(): number {
    const totalQuestions = this.questions.length;
    return Math.round((this.getCompletedCount() / totalQuestions) * 100);
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > this.maxFileSize) {
          this.logService.openSnackBar(`File "${file.name}" exceeds 10MB limit`, 'error');
          continue;
        }

        if (this.allowMultiple) {
          if (!this.selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
            this.selectedFiles.push(file);
          }
        } else {
          this.selectedFiles = [file];
          break;
        }
      }

      this.fileInput.nativeElement.value = '';
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const now = new Date();
    const formatted =
      now.getFullYear().toString() +
      ('0' + (now.getMonth() + 1)).slice(-2) +
      ('0' + now.getDate()).slice(-2) + '_' +
      ('0' + now.getHours()).slice(-2) +
      ('0' + now.getMinutes()).slice(-2);

    const formData = {
      ...this.form.value,
      Created: now.toISOString(),
      Modified: now.toISOString(),
      ID: this.generateLocalId(),
      isLocal: true,
      UserName: this.authService.currentUser?.name || 'Current User',
      Title: `Inspection_${formatted}`
    };

    const isOnline = await this.connectivityService.checkInternetConnection();
    this.isOnline = isOnline;

    if (isOnline) {
      await this.submitToSharePointWithAttachments(formData);
    } else {
      this.saveToLocalStorageWithAttachments(formData);
      this.isSubmitting = false;
      this.logService.openSnackBar('Checklist saved locally. Will sync when online.', 'success');
      this.goBack();
    }
  }

  private submitToSharePointWithAttachments(formData: any) {
    try {
      this.sharepointService.addListItem('FBO Vehicle Daily Inspection Checklist', {Title:formData.Title,...this.form.value})
        .subscribe({
          next: async (res: any) => {
            console.log('Successfully submitted to SharePoint:', res);
            if (this.selectedFiles.length > 0 && res && res.d.ID) {
              const itemId = res.d.ID;
              await this.uploadAttachments(itemId);
            }

            this.isSubmitting = false;
            this.logService.openSnackBar('Checklist added successfully!', 'success');
            this.goBack();
          },
          error: (error) => {
            console.log('Failed to submit to SharePoint, saving locally:', error);
            this.saveToLocalStorageWithAttachments(formData);
            this.isSubmitting = false;
            this.logService.openSnackBar('Checklist saved locally. Will sync when online.', 'success');
            this.goBack();
          }
        });
    } catch (error) {
      console.error('Error in submission process:', error);
      this.saveToLocalStorageWithAttachments(formData);
      this.isSubmitting = false;
      this.logService.openSnackBar('Checklist saved locally. Will sync when online.', 'success');
      this.goBack();
    }
  }

  async uploadAttachments(itemId: number): Promise<void> {
    const listName = 'FBO Vehicle Daily Inspection Checklist';
    const uploadPromises: Promise<any>[] = [];

    for (const file of this.selectedFiles) {
      const uploadPromise = new Promise((resolve, reject) => {
        this.sharepointService.uploadAttachment(listName, itemId, file)
          .subscribe({
            next: (res) => {
              console.log(`Successfully uploaded attachment: ${file.name}`, res);
              resolve(res);
            },
            error: (error) => {
              console.error(`Failed to upload attachment: ${file.name}`, error);
              resolve(null);
            }
          });
      });
      uploadPromises.push(uploadPromise);
    }

    await Promise.all(uploadPromises);
    console.log('All attachment uploads completed');
  }

  private saveToLocalStorageWithAttachments(formData: any): void {
    try {
      const filesToStore: any[] = [];

      const readFilePromises = this.selectedFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            filesToStore.push({
              name: file.name,
              type: file.type,
              size: file.size,
              data: e.target.result // base64 data
            });
            resolve(true);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readFilePromises).then(() => {
        const submissionData = {
          ...formData,
          attachments: filesToStore
        };

        const pendingSubmissions = this.getPendingSubmissions();
        pendingSubmissions.push(submissionData);
        localStorage.setItem('pendingChecklistSubmissions', JSON.stringify(pendingSubmissions));
        console.log('Successfully saved to local storage with attachments:', formData.ID);
      });

    } catch (error) {
      console.error('Error saving to local storage:', error);
      this.logService.openSnackBar('Error saving locally. Please try again.', 'error');
    }
  }

  private generateLocalId(): string {
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const time = Date.now().toString().slice(-4);
    return `L${time}${random}`;
  }

  private getPendingSubmissions(): any[] {
    try {
      const stored = localStorage.getItem('pendingChecklistSubmissions');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from local storage:', error);
      return [];
    }
  }

  private generateTitle() {
    const date = new Date().toISOString().split('T')[0];
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `Inspection ${date} ${random}`;
  }

  goBack() {
    this.location.back();
  }

  isRequired(id: string): boolean {
    const control = this.form.get(id);
    return !!control?.validator && control.validator({} as any)?.['required'];
  }

}
