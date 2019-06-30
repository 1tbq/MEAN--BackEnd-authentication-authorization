import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token:string){
    window.localStorage.setItem('jwt-token',token);
  }
  getToken(){
    return window.localStorage.getItem('jwt-token');
  }
  distroyToken(){
    window.localStorage.removeItem('jwt-token');
  }
}
