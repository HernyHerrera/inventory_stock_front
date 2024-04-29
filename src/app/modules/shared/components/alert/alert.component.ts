import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  public data = inject(MAT_DIALOG_DATA);
  public dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef);
  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
