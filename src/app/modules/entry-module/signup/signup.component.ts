import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OtpVerificationComponent } from 'src/app/authentication/otp-verification/otp-verification.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { userDetails } from 'src/app/models/user-auth.model';
import { SnackbarComponent } from 'src/app/shared/components/snack-bar/snackbar.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  private userDetails: userDetails = new userDetails();
  public errorMessage:String=''
  public hide: boolean = true;
  public isLoading: boolean = false;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public name = new FormControl('', [Validators.required]);
  public number = new FormControl('', [
    Validators.required,
    Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
  ]);
  public error: boolean = false;
  public isVerify: String = '';

  getErrorMessage(field) {
    this.error = false;
    if (field === 'email') {
      if (this.email.hasError('required')) {
        return 'You must enter your email';
      } else {
        return this.email.hasError('email') ? 'Not a valid email' : '';
      }
    } else if (field === 'password') {
      if (this.password.hasError('required')) {
        return 'You must enter your password';
      }
    } else if (field === 'name') {
      if (this.password.hasError('required')) {
        return 'You must enter your name';
      }
    } else if (field === 'mobile-number') {
      if (this.number.hasError('required')) {
        return 'You must enter your mobile number';
      } else {
        return 'Not a valid mobile number'
        
      }
    }
    return '';
  }

  submit() {
    if(this.email.valid && this.name.valid && this.password.valid && this.number.valid && this.isVerify === 'true'){
      this.isLoading = true;
      this.userDetails = new userDetails({
        name: this.name.value,
        email: this.email.value,
        number: this.number.value,
        password: this.password.value,
      });
      this._userService.userRegistration(this.userDetails).subscribe({
        next: (res: any) => {
          this.errorMessage = res.message
          this.isLoading = false;
          this._snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition:'center',
            verticalPosition: 'top',
            data:{message:'User registration successful'},
            duration:5000,
          });
          this._router.navigate(['/user/login']);
        },
        error: (error) => {
          this.errorMessage = error.error
          this.error = true;
          this.isLoading = false;
        },
      });
    }else if(this.isVerify === 'false' || this.isVerify === ''){
      this.errorMessage = "please verify your email to proceed"
      this.error = true;
    }else{
      this.errorMessage = "please fill all mandatory fields to proceed"
      this.error = true;
    }
  }

  verifyEmail() {
    const dialogRef = this._dialog.open(OtpVerificationComponent, {
      disableClose: true,
      width: '400px',
      height: '360px',
      data: { email: this.email.value ,component:'signup'},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isVerify = 'true';
        this.error = false
      } else {
        this.isVerify = 'false';
        this.errorMessage = "please verify your email to proceed"
        this.error = true
      }
    });
  }
}
