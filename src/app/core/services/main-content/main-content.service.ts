import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/api-url-environment';

@Injectable({
  providedIn: 'root',
})
export class MainContentService {
  public url = environment.baseApiUrls;

  constructor(private _http: HttpClient) {}

  getProductlist() {
    return this._http.get(`${this.url.productApi}/productlist`);
  }

  getSingleProductDetails(id:string){
    const url ="http://localhost:8080/api/product"
  // return this._http.get(`${this.url.productApi}/product/${id}`)
  return this._http.get(`${url}/product/${id}`)
  }

}
