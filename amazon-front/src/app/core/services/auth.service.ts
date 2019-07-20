import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { User, LoginResponse, SignupResponse, logoutResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  login(body:User):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${environment.api_url}/users/login`,body)
   }
   signup(body:User):Observable<SignupResponse>{
    return this.httpClient.post<SignupResponse>(`${environment.api_url}/users/signup`,body)
   }
   isAuthenticated(token):Observable<boolean>{
     const httpOptions ={
       headers: new HttpHeaders({
         'Content-Type':'application/json',
         Authorization:`bearer ${token}`
       })
     }
    return this.httpClient.get<boolean>(`${environment.api_url}/auth/authenticate`,httpOptions);
   }                                
   logout():Observable<logoutResponse>{
     return this.httpClient.get<logoutResponse>(`${environment.api_url}/auth/logout`);
   }     
   forgotPassword(data:{email:string}):Observable<{message:string}>{
    return this.httpClient.post<{message:string}>(`${environment.api_url}/users/forgot-password`,data);

   }
   resetPassword(body):Observable<{success:boolean}>{
  const httpOptions ={
    headers: new HttpHeaders({
      'Content-Type':'application/json',
         Authorization:`bearer ${body.token}`
    })
  }
     return this.httpClient.put<{success:boolean}>
     (`${environment.api_url}/users/reset-password`,{password: body.password},httpOptions);
   }                             
}
