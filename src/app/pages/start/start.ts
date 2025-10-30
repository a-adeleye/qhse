import {Component, inject, OnDestroy, OnInit} from '@angular/core';
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
import {provideNativeDateAdapter} from '@angular/material/core';
import {SharePointService} from '@shared/services/sharepoint/sharepoint.service';
import {AuthService} from '@shared/services/auth/auth.service';
import {Loading} from '@shared/components/loading/loading.component';
import {LogsService} from '@shared/services/logs/logs.service';
import {InternetConnectivityService} from '@shared/services/internet-connectivity/internet-connectivity.service';

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
    Loading,
    Loading,
  ]
})
export class Start implements OnInit, OnDestroy {
  sharepointService = inject(SharePointService);
  location = inject(Location);
  loading = false;
  isOnline = true;
  private connectivitySubscription: any;

  questions = [
    { id: "Title", title: "Title", type: "Single_line_of_text", required: true },
    { id: "DateOfinspection", title: "Date Of inspection", type: "Date_and_Time", required: true },
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
  ];

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private logService = inject(LogsService);
  private connectivityService = inject(InternetConnectivityService);

  form:UntypedFormGroup = this.fb.group({});

  async ngOnInit() {
    const formGroupConfig: any = {};
    this.questions.forEach(q => {
      formGroupConfig[q.id] = [null, q.required ? Validators.required : null];
    });

    const date = new Date();
    this.form = this.fb.group(formGroupConfig);
    this.form.addControl('DoneById', new FormControl(this.authService.loadFromStorage()?.Id, Validators.required));
    this.form.get('Title')?.setValue(this.generateTitle());
    this.form.get('DateOfinspection')?.setValue(date);

    this.isOnline = await this.connectivityService.checkInternetConnection();
    this.connectivityService.onConnectionChange((online: boolean) => {
      this.isOnline = online;
      console.log('Connectivity changed:', online ? 'Online' : 'Offline');
    });
  }

  ngOnDestroy() {
    if (this.connectivitySubscription) {
    }
  }

  goBack() {
    this.location.back();
  }

  getCompletedCount(): number {
    const controls = Object.entries(this.form.controls)
      .filter(([key]) => key !== 'DoneById');

    return controls.filter(([_, control]: any) =>
      control.value !== null && control.value !== ''
    ).length;
  }

  getProgress(): number {
    const totalQuestions = this.questions.length; // only visible ones
    return Math.round((this.getCompletedCount() / totalQuestions) * 100);
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = {
      ...this.form.value,
      Created: new Date().toISOString(),
      Modified: new Date().toISOString(),
      ID: this.generateLocalId(),
      isLocal: true,
      UserName:this.authService.currentUser.name
    };

    const isOnline = await this.connectivityService.checkInternetConnection();
    this.isOnline = isOnline;

    if (isOnline) {
      this.submitToSharePoint(formData);
    } else {
      this.saveToLocalStorage(formData);
      this.loading = false;
      this.logService.openSnackBar('Checklist saved locally. Will sync when online.', 'success');
      this.goBack();
    }
  }

  private submitToSharePoint(formData: any): void {
    this.sharepointService.addListItem('Airside - FBO Vehicle Daily Inspection Checklist', this.form.value)
      .subscribe({
        next: (res) => {
          console.log('Successfully submitted to SharePoint:', res);
          this.loading = false;
          this.logService.openSnackBar('Checklist added successfully!', 'success');
          this.goBack();
        },
        error: (error) => {
          console.log('Failed to submit to SharePoint, saving locally:', error);
          this.saveToLocalStorage(formData);
          this.loading = false;
          this.logService.openSnackBar('Checklist saved locally. Will sync when online.', 'success');
          this.goBack();
        }
      });
  }

  private saveToLocalStorage(formData: any): void {
    try {
      const pendingSubmissions = this.getPendingSubmissions();
      pendingSubmissions.push(formData);
      localStorage.setItem('pendingChecklistSubmissions', JSON.stringify(pendingSubmissions));
      console.log('Successfully saved to local storage:', formData.ID);
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
}
