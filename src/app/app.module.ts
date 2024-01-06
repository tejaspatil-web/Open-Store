import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { MatModule } from './modules/material-module/mat.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesModule } from './features/features.module';
import { RouterModule } from '@angular/router';
import { CartComponent } from './shared/components/cart-dialogbox/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAccessInterceptor } from './interceptors/user-access.interceptor';
import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { SnackbarComponent } from './shared/components/snack-bar/snackbar.component';

@NgModule({
  declarations: [AppComponent, CartComponent, OtpVerificationComponent, SnackbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    MatModule,
    BrowserAnimationsModule,
    FeaturesModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:UserAccessInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
