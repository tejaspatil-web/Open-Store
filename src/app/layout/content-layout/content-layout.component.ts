import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { MainContentService } from 'src/app/core/services/main-content/main-content.service';
import { ProductFilterService } from 'src/app/shared/services/product-filter.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent {
  public productData: Array<object>;
  public filterData:any
  public dataTypeElectronics: Array<object>
  public isLoding: boolean = true
  cart: Array<object>;
  constructor(private _contentService: MainContentService, private _router: Router, private _productSearchService: ProductFilterService) { }

  ngOnInit() {
    this.productList()
    this.searchProduct()
  }

  productList() {
    this._contentService.getProductlist().subscribe((data: any) => {
      this.productData = data
      this.dataTypeElectronics = data.filter(element => element.productType === 'electronics');
      this.dataTypeElectronics.forEach((data: any) => {
        data.ratings = parseInt(data.productRating)
        data.isLoding = false
        data.cart = false
      })
      this.filterData = this.dataTypeElectronics
      this.isLoding = false
    })
  }

  addToCart(value) {
    this.productData.forEach((element: any) => {
      element.isLoding = false
    })
    value.isLoding = true
    if(!value.cart){
      value.cart = true
      this._productSearchService.addToCart(value)
      value.isLoding = false
    }else{
      value.isLoding = false
    }
  }

  searchProduct() {
    this.filterData = this.dataTypeElectronics
    let filterData:Array<object>
    this._productSearchService.$searchValue.pipe(debounceTime(200))
    .subscribe(value => {
      if(this.dataTypeElectronics){
       filterData= this.dataTypeElectronics.filter(ele => JSON.stringify(ele).trim().toLowerCase().includes((value.trim().toLowerCase())))
      }
     this.filterData = filterData
    })
  }

}
