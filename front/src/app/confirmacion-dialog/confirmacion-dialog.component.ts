import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmacion-dialog',
  templateUrl: './confirmacion-dialog.component.html',
  styleUrls: ['./confirmacion-dialog.component.css']
})
export class ConfirmacionDialogComponent {
  title: string;
  message: string;
  datos: string[]=[];
 
  constructor(public dialogRef: MatDialogRef<ConfirmacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacionDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.datos = data.datos;
  }
  
  confirmar(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }
 
  cancelar(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class ConfirmacionDialogModel {
 
  constructor(public title: string, public message: string, public datos: string[]) {
  }
}