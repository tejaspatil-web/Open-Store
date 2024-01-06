import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user/user.service';
import { userAuthenticationModel } from 'src/app/models/user-auth.model';
import { Router } from '@angular/router';
import { OtpVerificationComponent } from 'src/app/authentication/otp-verification/otp-verification.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snack-bar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private userAuth: userAuthenticationModel = new userAuthenticationModel();
  public hide: boolean = true;
  public isLoading:boolean=false
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public error: boolean = false;

  constructor(private user: UserService,private _roter:Router, public dialog: MatDialog,private _snackBar: MatSnackBar) {}
  ngOnInit() {}

  getErrorMessage(field) {
    this.error = false
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

  forgotPassword(){
    const dialogRef = this.dialog.open(OtpVerificationComponent, {
      disableClose: true,
      width: '400px',
      height: 'auto',
      data: { component:'login' },
  })
}

  submit() {
    this.isLoading = true
    this.userAuth = new userAuthenticationModel({
      email: this.email.value,
      password: this.password.value,
    });
    this.user.userAuthentication(this.userAuth).subscribe({
      next: (res:any) => {
        this.isLoading = false
        localStorage.setItem('access-token',res.accessToken)
        localStorage.setItem('userId',res.userId)
        this._snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition:'center',
          verticalPosition: 'top',
          data:{message:'Logged in successful'},
          duration:5000,
        });
        this._roter.navigate([''])
      },
      error: (err) => {
        this.error = true
        this.isLoading = false
      },
    });
  }
}
