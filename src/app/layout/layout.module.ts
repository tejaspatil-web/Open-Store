import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { RouterModule } from '@angular/router';
import { SkeletonLoaderComponent } from '../shared/components/skeleton-loader/skeleton-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { EntryModule } from '../modules/entry-module/entry.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ContentLayoutComponent,
    SkeletonLoaderComponent,
  ],
  imports: [CommonModule, RouterModule, NgxSkeletonLoaderModule, EntryModule],
  exports: [HeaderComponent, FooterComponent, ContentLayoutComponent],
})
export class LayoutModule {}
