import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [

  {path:'login',component:AuthComponent},
  {path:'signup',component:AuthComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password/:token',component:ResetPasswordComponent},
  {path:'shop',component:ShopComponent,canActivate:[AuthGuardService]},
  {path: '**',redirectTo: 'shop'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
