import { Component } from '@angular/core';
import { MainContentService } from 'src/app/core/services/main-content/main-content.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent {
  public productData: Array<object>;
  public dataTypeElectronics : Array<object>
  constructor(private _contentService: MainContentService) {}

  ngOnInit() {
    this._contentService.getProductData().subscribe((data: any) => {
      this.productData = data
      this.dataTypeElectronics= data.filter(element => element.productType === 'electronics');
    });
  }
}
