import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _httpClient:HttpClient) { }
  signUp(userData:object):Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userData)
  }
  signIn(userData:object):Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userData)
  }
  getToken(){
    const encode =localStorage.getItem('_token')
    if(encode){
      const decode = jwtDecode(encode)
      console.log(decode)
    }
  }
  forgetPassword(email:object):Observable<any>{
return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, email)
  }
  verifyCode(resetCode:any):Observable<any>{
return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,resetCode)
  }
  resetPassword(userData:object):Observable<any>{
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,userData)
  }
}
