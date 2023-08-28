import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
       FooterComponent,
       ContentLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[ 
    HeaderComponent,
    FooterComponent,
    ContentLayoutComponent
  ]
})
export class LayoutModule { }