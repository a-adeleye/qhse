import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-start',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './start.html',
  styleUrl: './start.scss'
})
export class Start {
  questions = [
    {id: 'q1', text: 'Is the equipment ready?'},
    {id: 'q2', text: 'Are safety checks complete?'},
    {id: 'q3', text: 'Do you acknowledge the policy?'},
  ];

  fb = inject(FormBuilder);

  form = this.fb.group({
    answers: this.fb.array(this.questions.map(() => this.fb.control<boolean | null>(null)))
  });

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Placeholder: handle submission (e.g., API call)
    console.log('Responses:', this.form.value);
  }
}

