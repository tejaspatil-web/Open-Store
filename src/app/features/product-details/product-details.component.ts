import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainContentService } from 'src/app/core/services/main-content/main-content.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
constructor(private _route: ActivatedRoute,private _contentService: MainContentService){}

ngOnInit(){
  this.productDetail()
}

productDetail(): void {
  const id = String(this._route.snapshot.paramMap.get('id'));
  this._contentService.getSingleProductDetails(id).subscribe(element =>{
    console.log(element)
  })
}

}