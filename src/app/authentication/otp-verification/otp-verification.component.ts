import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, finalize } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { errorMessage, successMessage, validationMessage } from 'src/app/models/user-auth.model';

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
  public forgotPasswordValues: string = validationMessage.forgotPassword;
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
      .sendOtpForEmailVerification(email).pipe(finalize(()=>{
        this.isLoading = false;
      }))
      .subscribe({
        next: (res: any) => {
          this.isOtpSend = true;
        },
        error: (error) => {
          this.isOtpSend = false;
          this.errorMessage;
        },
      });
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
      .userEmailVerification(email, otp).pipe(finalize(()=>{
       this.isSubmitDone = false;
      }))
      .subscribe({
        next: (res: any) => {
      this.isVerification = true;
      this._showErrorMessage(successMessage.verificationSuccessfully);
        },
        error: (error) => {
      this.isVerification = false;
      this._showErrorMessage(errorMessage.invalidOtp);
        }
      });
  }

  forgotPassword() {
    if (this.email.valid) {
      this.isSubmitDone = true;
      this._sendOtpResetPasswordSubscription = this._userService
        .sendOtpResetPassword(this.email.value)
        .subscribe({
          next: (res: any) => {
            this.forgotPasswordValues = errorMessage.verificationRequired;
            this.isSubmitDone = false;
            this.isError = false;
          },
          error: (error) => {
            this.isError = true;
            this.isSubmitDone = false;
            this.errorMessage = errorMessage.enterValidEmail;
          },
        });
    } else {
      this.isError = true;
      this.isSubmitDone = false;
      this.errorMessage = errorMessage.enterValidEmail;
    }
  }

  otpVerificationForResetPassword() {
    this.isSubmitDone = true;
    this._otpVerifiactionResetPasswordSubscription = this._userService
      .otpVerifiactionResetPassword(this.email.value, this.userOtp)
      .subscribe({
        next: (res) => {
          this.forgotPasswordValues = validationMessage.resetPassword;
          this.isSubmitDone = false;
          this.isError = false;
        },
        error: (erorr) => {
          this.isError = true;
          this.isSubmitDone = false;
          this.errorMessage = errorMessage.enterValidOtp;
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
            this.errorMessage = successMessage.passwordChanged;
            setTimeout(() => {
              this.dialogRef.close(this.isVerification);
            }, 2000);
          },
          error: (erorr) => {
            this.isError = true;
            this.isSubmitDone = false;
            this.errorMessage = errorMessage.unableChangePassword
          },
        });
    } else {
      this.isError = true;
      this.isSubmitDone = false;
      this.errorMessage = errorMessage.passwordNotMatch;
    }
  }

  resetPassword() {
    this.isSubmitDone = true;
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
        return errorMessage.email;
      } else {
        return this.email.hasError('email') ? errorMessage.emailNotValid: '';
      }
    } else if (field === 'password') {
      if (this.password.hasError('required')) {
        return errorMessage.password;
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
