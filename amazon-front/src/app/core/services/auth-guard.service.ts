
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Router,CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private jwtService:JwtService,
    private router:Router) { }

    canActivate(): boolean{
      if(this.jwtService.getToken()){
        return true;
      }else{
        this.router.navigate(['/login']);
      return false;
      }
  }
}
