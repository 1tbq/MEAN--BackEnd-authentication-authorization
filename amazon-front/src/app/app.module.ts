import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShopComponent } from './shop/shop.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { HttpInterceptorService } from './core/services/http-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ToolBarComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    HttpClientModule
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpInterceptorService,
      multi:true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
