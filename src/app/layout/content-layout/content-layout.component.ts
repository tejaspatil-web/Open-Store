import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { debounceTime } from 'rxjs';
import { MainContentService } from 'src/app/core/services/main-content/main-content.service';
import { basePathLocal } from 'src/app/shared/constant/constant-url';
import { ProductFilterService } from 'src/app/shared/services/product-filter.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent {
  public imagesPath = basePathLocal;
  public productData: Array<object>;
  public filterDataElectronics : Array<object>;
  public dataTypeElectronics: Array<object>;
  public dataTypeCloths: Array<object>;
  public filterDataTypeCloths: Array<object>;
  public isLoding: boolean = true;
  public cart: Array<object>;
  public cards = []
  constructor(
    private _contentService: MainContentService,
    private _productSearchService: ProductFilterService,
    private _http:HttpClient
  ) {}

  ngOnInit() {
    this.cards = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      this.cards.push(i);
    }
    this.productList();
    this.searchProduct();
  }

  productList() {
    this._contentService.getProductlist().subscribe((data: any) => {
      this.productData = data;
      this.dataTypeElectronics = data.filter(
        (element) => element.productType === 'electronics'
      );

      this.dataTypeElectronics.forEach((data: any) => {
        data.ratings = parseInt(data.productRating);
        data.isLoding = false;
        data.cart = false;
      });

      this.dataTypeCloths = data.filter(
        (element) => element.productType === 'clothing and accessories'
      )
      this.dataTypeCloths.forEach((data: any) => {
        data.ratings = parseInt(data.productRating);
        data.isLoding = false;
        data.cart = false;
      });

      this.filterDataElectronics = JSON.parse(JSON.stringify(this.dataTypeElectronics)) 
      this.filterDataTypeCloths = JSON.parse(JSON.stringify(this.dataTypeCloths)) 
      this.isLoding = false;
    });
  }

  addToCart(value) {
    this.productData.forEach((element: any) => {
      element.isLoding = false;
    });
    value.isLoding = true;
    if (!value.cart) {
      value.cart = true;
      this._productSearchService.addToCart(value);
      value.isLoding = false;
    } else {
      value.isLoding = false;
    }
  }

  searchProduct() {
    this.filterDataElectronics  = this.dataTypeElectronics;
    this.filterDataTypeCloths = this.dataTypeCloths;
    let filterDataElectronics : Array<object>;
    let filterDataTypeCloths : Array<object>;
    this._productSearchService.$searchValue
      .pipe(debounceTime(200))
      .subscribe((value) => {
        if (this.dataTypeElectronics || this.dataTypeCloths) {
          filterDataElectronics  = this.dataTypeElectronics.filter((ele) =>
            JSON.stringify(ele)
              .trim()
              .toLowerCase()
              .includes(value.trim().toLowerCase())
          );

          filterDataTypeCloths = this.dataTypeCloths.filter((ele) =>
            JSON.stringify(ele)
              .trim()
              .toLowerCase()
              .includes(value.trim().toLowerCase())
          );
        }
        this.filterDataElectronics = filterDataElectronics;
        this.filterDataTypeCloths = filterDataTypeCloths;
      });
  }

}
