import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, LoginResponse, SignupResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  login(body:User):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${environment.api_arl}/users/login`,body)
   }
   signup(body:User):Observable<SignupResponse>{
    return this.httpClient.post<SignupResponse>(`${environment.api_arl}/users/signup`,body)
   }
}
