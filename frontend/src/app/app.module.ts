import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { MainWelcomeComponent } from './main/main-welcome/main-welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { MainMotorComponent } from './main/main-motor/main-motor.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { CommonModule } from '@angular/common';

const config: SocketIoConfig = {
  url: 'http://10.0.1.50:3001/',
  options: {
    transports: ['websocket'],
  },
};

@NgModule({
  declarations: [AppComponent, MainWelcomeComponent, MainMotorComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
