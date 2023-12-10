import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: ContentLayoutComponent },
  { path: 'product/detail/:id', component: ProductDetailsComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/entry-module/entry-routing.module').then(
        (module) => module.EntryRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
