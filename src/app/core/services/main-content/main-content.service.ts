import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainContentService {
  public url = 'https://open-store.onrender.com/api/product/productlist'

  constructor(private _http:HttpClient) { }

getProductData(){
  return this._http.get(this.url)
}




}
