import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent {
  public isOtpSend: boolean = true;
  public isLoading: boolean = true;
  public userOtp: String = '';
  public isSubmitDone:Boolean = false
  public isVerification: boolean = false;
  public errorMessage:String=''
  constructor(
    public dialogRef: MatDialogRef<OtpVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService
  ) {}

  ngOnInit() {
    const email = this.data.email;
    if (email !== '') {
      this.otpVerification({ email: email });
    } else {
      this.isOtpSend = false;
      this.isLoading = false;
    }
  }

  otpVerification(email: Object) {
    this._userService.sendOtpForEmailVerification(email).subscribe({
      next: (res: any) => {
        this.handleError(res);
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  handleError(status) {
    if (status.status === 200) {
      this.isOtpSend = true;
    } else {
      this.isOtpSend = false;
      this.errorMessage
    }
    this.isLoading = false;
  }

  validationForOtp(event) {
    const regexPattern = /\D/g; // Match non-digits
    let value = event.target.value.replace(regexPattern, ''); // Remove non-digits
    value = value.slice(0, 4); // Keep only the first 4 digits
    event.target.value = value;
    this.userOtp = event.target.value;
  }


  submit() {
    this.isSubmitDone = true
    const email = this.data.email;
    const otp = this.userOtp;
    this._userService.userEmailVerification(email, otp).subscribe({
      next: (res:any) => {
        this._verification(res)
      },
      error: (error) => {
        this._verification(error)
  }
})
}

private _verification(response){
  if (response.status === 200) {
    this.isVerification = true;
    this._showErrorMessage('verification successfully')
  }else{
    this.isVerification = false;
    this._showErrorMessage('Invalid OTP entered')
  }
  this.isSubmitDone = false
}

private _showErrorMessage(error){
  if(this.isVerification){
    this.dialogRef.close(this.isVerification)
  }else{
    this.errorMessage = error
  }
}

  closeDialog(): void {
    this.dialogRef.close(this.isVerification);
  }
}
