import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ShopComponent } from './shop/shop.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToolBarComponent } from './tool-bar/tool-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ToolBarComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
