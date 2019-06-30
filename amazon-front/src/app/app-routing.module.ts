import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {path:'login',component:AuthComponent},
  {path:'signup',component:AuthComponent},
  {path:'shop',component:ShopComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
