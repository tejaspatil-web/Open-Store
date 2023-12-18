import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  public hideConfirmPassword: boolean = true;
  public hidePassword: boolean = true;
  public isOtpSend: boolean = true;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public confirmPassword = new FormControl('', [Validators.required]);
  public isLoading: boolean = true;
  public forgotPasswordValues: string = 'forgot-password';
  public userOtp: String = '';
  public isSubmitDone: Boolean = false;
  public isVerification: boolean = false;
  public errorMessage: String = '';
  public component: String = '';
  public isError: boolean = false;
  public isPasswordUpdated = false;
  private _sendOtpForEmailVerificationSubscription: Subscription;
  private _userEmailVerificationSubscription: Subscription;
  private _sendOtpResetPasswordSubscription: Subscription;
  private _otpVerifiactionResetPasswordSubscription: Subscription;
  private _updatePasswordSubscription: Subscription;
  constructor(
    public dialogRef: MatDialogRef<OtpVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    const email = this.data.email;
    this.component = this.data.component;
    if (this.component === 'signup') {
      if (email !== '') {
        this.otpVerification({ email: email });
      } else {
        this.isOtpSend = false;
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
    }
  }

  otpVerification(email: Object) {
    this._sendOtpForEmailVerificationSubscription = this._userService
      .sendOtpForEmailVerification(email)
      .subscribe({
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
      this.errorMessage;
    }
    this.isLoading = false;
  }

  validationForOtp(event) {
    const regexPattern = /\D/g; // Match non-digits
    let value = event.target.value.replace(regexPattern, ''); // Remove non-digits
    value = value.slice(0, 4); // Keep only the first 4 digits
    event.target.value = value;
    this.userOtp = event.target.value;
    this.isError = false;
  }

  submit() {
    this.isSubmitDone = true;
    const email = this.data.email;
    const otp = this.userOtp;
    this._userEmailVerificationSubscription = this._userService
      .userEmailVerification(email, otp)
      .subscribe({
        next: (res: any) => {
          this._verification(res);
        },
        error: (error) => {
          this._verification(error);
        },
      });
  }

  forgotPassword() {
    if (this.email.valid) {
      this.isSubmitDone = true;
      this._sendOtpResetPasswordSubscription = this._userService
        .sendOtpResetPassword(this.email.value)
        .subscribe({
          next: (res: any) => {
            this.forgotPasswordValues = 'verification-required';
            this.isSubmitDone = false;
            this.isError = false;
          },
          error: (error) => {
            this.isError = true;
            this.isSubmitDone = false;
            this.errorMessage = 'Please enter valid email';
          },
        });
    } else {
      this.isError = true;
      this.isSubmitDone = false;
      this.errorMessage = 'Please enter valid email';
    }
  }

  otpVerificationForResetPassword() {
    this.isSubmitDone = true;
    this._otpVerifiactionResetPasswordSubscription = this._userService
      .otpVerifiactionResetPassword(this.email.value, this.userOtp)
      .subscribe({
        next: (res) => {
          this.forgotPasswordValues = 'reset-password';
          this.isSubmitDone = false;
          this.isError = false;
        },
        error: (erorr) => {
          this.isError = true;
          this.isSubmitDone = false;
          this.errorMessage = 'Please enter valid otp';
        },
      });
  }

  changePassword() {
    this.isSubmitDone = true;
    if (this.password.value === this.confirmPassword.value) {
      this._updatePasswordSubscription = this._userService
        .updatePassword(
          this.email.value,
          this.confirmPassword.value,
          this.userOtp
        )
        .subscribe({
          next: (res) => {
            this.isSubmitDone = false;
            this.isError = true;
            this.isPasswordUpdated = true;
            this.errorMessage = 'Password changed successfully';
            setTimeout(() => {
              this.dialogRef.close(this.isVerification);
            }, 2000);
          },
          error: (erorr) => {
            this.isError = true;
            this.isSubmitDone = false;
            this.errorMessage = 'Unable to change your password try again';
          },
        });
    } else {
      this.isError = true;
      this.isSubmitDone = false;
      this.errorMessage = 'Password do not match';
    }
  }

  resetPassword() {
    this.isSubmitDone = true;
  }

  private _verification(response) {
    if (response.status === 200) {
      this.isVerification = true;
      this._showErrorMessage('verification successfully');
    } else {
      this.isVerification = false;
      this._showErrorMessage('Invalid OTP entered');
    }
    this.isSubmitDone = false;
  }

  private _showErrorMessage(error) {
    if (this.isVerification) {
      this.dialogRef.close(this.isVerification);
    } else {
      this.errorMessage = error;
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.isVerification);
  }

  getErrorMessage(field) {
    if (field === 'email') {
      if (this.email.hasError('required')) {
        return 'You must enter a email';
      } else {
        return this.email.hasError('email') ? 'Not a valid email' : '';
      }
    } else if (field === 'password') {
      if (this.password.hasError('required')) {
        return 'You must enter a password';
      }
    }
    return '';
  }

  ngOnDestroy(): void {
    this.unsubscribe(this._sendOtpForEmailVerificationSubscription);
    this.unsubscribe(this._userEmailVerificationSubscription);
    this.unsubscribe(this._sendOtpResetPasswordSubscription);
    this.unsubscribe(this._otpVerifiactionResetPasswordSubscription);
    this.unsubscribe(this._updatePasswordSubscription);
  }

  private unsubscribe(subscription: Subscription | undefined) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
