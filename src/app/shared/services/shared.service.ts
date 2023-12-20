import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public isShowLogo: Subject<boolean> = new Subject();
  constructor() {}

getIsShowLogo(){
  return this.isShowLogo.asObservable();
}

setIsShowLogo(value:boolean){
  this.isShowLogo.next(value);
}

}
