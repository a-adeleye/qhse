import {Component, Inject, inject} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-notification-dialog',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatButton,
  ],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.scss'
})
export class NotificationDialogComponent {
  platform = '';
  readonly dialogRef = inject(MatDialogRef<NotificationDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.platform = data;
  }

  close() {
    this.dialogRef.close();
  }
}
