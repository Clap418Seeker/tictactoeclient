import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import {NgZorroAntdModule, NZ_I18N, ru_RU} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { GameComponent } from './components/game/game.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import {AuthInterceptor} from "./interseptors/auth.interceptor";
import { GameFieldsComponent } from './components/game-fields/game-fields.component';
import {MessagesInterceptor} from "./interseptors/messages.interceptor";

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    GameComponent,
    GameListComponent,
    LoginComponent,
    UserComponent,
    GameFieldsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: ru_RU },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MessagesInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
