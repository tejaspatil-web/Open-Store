import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/api-url-environment';
import { userAuthenticationModel , userDetails} from '../../../models/user-auth.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  private _url = environment.baseApiUrls;

  userAuthentication(userAuth: userAuthenticationModel) {
    return this._http.post(`${this._url.userApi}/login`, userAuth);
  }

  getUserDetails(id: string) {
    return this._http.get(`${this._url.userApi}/user/${id}`);
  }

  userRegistration(userDetails:userDetails){
    return this._http.post(`${this._url.userApi}/create`,userDetails)
  }

}
