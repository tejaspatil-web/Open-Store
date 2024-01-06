import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/api-url-environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url = environment.baseApiUrls;
  constructor(private _http:HttpClient) { }

  getSingleProductDetails(id:string){
    return this._http.get(`${this.url.productApi}/product/${id}`);
    }

}
