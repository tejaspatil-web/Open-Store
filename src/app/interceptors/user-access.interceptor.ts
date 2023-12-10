import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserAccessInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('access-token');
    if(!localToken){
      localStorage.setItem('access-token','');
    }
    request = request.clone({headers:request.headers.set('access-token',localToken)})
    return next.handle(request);
  }
}
