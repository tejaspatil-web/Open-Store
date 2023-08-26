import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
       FooterComponent,
       ContentLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ 
    HeaderComponent,
    FooterComponent,
    ContentLayoutComponent
  ]
})
export class LayoutModule { }