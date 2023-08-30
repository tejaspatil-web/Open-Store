import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
 
private _searchValue = new BehaviorSubject<string>('')
public $searchValue = this._searchValue.asObservable()

private _cart = new Subject<object>()
public $_cart = this._cart.asObservable()

constructor() {}

searchValue(value:string){
this._searchValue.next(value)
}

addToCart(data:Object){
this._cart.next(data)
}

}
