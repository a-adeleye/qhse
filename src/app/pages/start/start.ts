import {Component, inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharePointService } from '@shared/services/sharepoint/sharepoint.service';
import { Location } from '@angular/common';
import {AuthService} from '@shared/services/auth/auth.service';
import {Loading} from '@shared/components/loading/loading.component';
import {LogsService} from '@shared/services/logs/logs.service';

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
    NgIf,
    NgFor,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    Loading,
    Loading,
  ]
})
export class Start implements OnInit {
  sharepointService = inject(SharePointService);
  location = inject(Location);
  router = inject(Router);
  loading = false;

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

  form = this.fb.group({});

  ngOnInit() {
    const formGroupConfig: any = {};
    this.questions.forEach(q => {
      formGroupConfig[q.id] = [null, q.required ? Validators.required : null];
    });

    this.form = this.fb.group(formGroupConfig);
    this.form.addControl('DoneById', new FormControl(this.authService.loadFromStorage()?.Id, Validators.required));
  }

  goBack() {
    this.location.back();
  }

  getCompletedCount(): number {
    const controls = Object.values(this.form.controls);
    return controls.filter((control: any) =>
      control.value !== null && control.value !== ''
    ).length;
  }

  getProgress(): number {
    return Math.round((this.getCompletedCount() / this.questions.length) * 100);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    console.log('Form submitted:', this.form.value);

    let form = this.form.value;

    this.sharepointService.addListItem('Airside - FBO Vehicle Daily Inspection Checklist', this.form.value)
      .subscribe(res => {
        console.log(res);
        this.loading = false;
        this.logService.openSnackBar('Checklist added successfully!', 'success');
        this.goBack();
      }, error => {
        console.log(error);
        this.logService.openSnackBar('Checklist not saved!', 'error');
        this.loading = false;
      });
  }
}
