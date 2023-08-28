import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainContentService } from 'src/app/core/services/main-content/main-content.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent {
  public productData: Array<object>;
  public dataTypeElectronics : Array<object>
  public _isLoding:boolean = false
  constructor(private _contentService: MainContentService,private _router:Router) {}

  ngOnInit() {
    this.productList()
  }

productList(){
  this._contentService.getProductlist().subscribe((data: any) => {
    this.productData = data
    this.dataTypeElectronics= data.filter(element => element.productType === 'electronics');
    this.dataTypeElectronics.forEach((data:any) =>{
     data.ratings = parseInt(data.productRating)
     data.isLoding = false 
    })
  });
}

addToCart(value){
  this.productData.forEach((element:any) =>{
    element.isLoding = false
    if(element._id === value._id){
      element.isLoding = true
      return
    }
  })
}

// productRoute(event){
// this._router.navigate(['detail/'+event])
// }

}
