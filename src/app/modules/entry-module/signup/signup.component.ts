import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OtpVerificationComponent } from 'src/app/authentication/otp-verification/otp-verification.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { userDetails } from 'src/app/models/user-auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

constructor(private _router:Router,private _userService:UserService,public dialog: MatDialog,){}

  private userDetails: userDetails = new userDetails();
  public hide: boolean = true;
  public isLoading:boolean=false
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public name = new FormControl('',[Validators.required])
  public number = new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  public error: boolean = false;


  getErrorMessage(field) {
    this.error = false
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
    }else if (field === 'name'){
      if (this.password.hasError('required')) {
        return 'You must enter your name';
      }
    }else if (field === 'mobile-number'){
      if (this.number.hasError('required')) {
        return 'You must enter your mobile number';
      } else {
        return this.number.hasError('number') ? 'Not a valid mobile number' : '';
      }
    }
    return '';
  }
  


  submit() {
    this.isLoading = true
    this.userDetails = new userDetails({
      name:this.name.value,
      email: this.email.value,
      number:this.number.value,
      password: this.password.value,
    });
    this._userService.userRegistration(this.userDetails).subscribe({
      next: (res:any) => {
        this.isLoading = false
        this._router.navigate(['/user/login'])
      },
      error: (err) => {
        this.error = true
        this.isLoading = false
      },
    });
  }

  verifyEmail(){
    const dialogRef = this.dialog.open(OtpVerificationComponent,{
      disableClose: true,
      width:'400px', 
      height:'350px',  
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      result;
    });
  }

}
