import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
constructor(private _route: ActivatedRoute,private _productService: ProductService){}
public product:object


ngOnInit(){
  this.productDetail()
}

productDetail(): void {
  const id = String(this._route.snapshot.paramMap.get('id'));
  this._productService.getSingleProductDetails(id).subscribe(element =>{
    element['rating'] = parseInt(element['productRating'])
    this.product = element
  })
}

productDescription(){
let details:Array<any>
  if(this.product){
     details =  Object.keys(this.product?.['productDetails']);
  }
  return details
}
}