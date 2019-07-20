
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import {map, catchError} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate,CanActivateChild {
  constructor(
    private jwtService:JwtService,
    private router:Router,
    private authService:AuthService) { }

    canActivate(
      route:ActivatedRouteSnapshot,
      state:RouterStateSnapshot): Observable<boolean>{
      if(this.jwtService.getToken()){
        return of(true);
      }
      const token = route.queryParamMap.get('token'); 
      if(token){
        return this.authService.isAuthenticated(token).pipe(
          map(authenticated=>{
            if(authenticated===true){
              this.jwtService.setToken(token);
              this.router.navigate(['/shop']);
              return true;
            }
            this.router.navigate(['/login']);
            return false;
          }),
          catchError((error:any)=>{
            this.router.navigate(['/login']);
            return of(false);
          })        
        );
      
      }
      else{
        this.router.navigate(['/login']);
      return of(false);
      }
  }
  canActivateChild(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):Observable<boolean>{
    return this.canActivate(route,state)
  }
}
