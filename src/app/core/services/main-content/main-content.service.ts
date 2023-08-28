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
  return this._http.get(`${this.url.productApi}/product/${id}`)
  }

}
