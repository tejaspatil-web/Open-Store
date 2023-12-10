import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent {

  constructor(public dialogRef: MatDialogRef<OtpVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){}
  
  ngOnInit(){
    this.data
  }
  
    closeDialog(): void {
      this.dialogRef.close();
    }


}
