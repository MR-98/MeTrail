import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BackgroundGeolocation } from "@ionic-native/background-geolocation/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { HomeComponent } from './components/home/home.component';
import { LocationTrackerService } from './services/location-tracker.service'
import { LoginComponent } from './components/login/login.component';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './utils/JwtInterceptor';
import { ErrorInterceptor } from './utils/ErrorInterceptor';
import { CommonModule } from "@angular/common";
import { SettingsComponent } from './components/settings/settings.component';
import { VehicleService } from './services/vehicle.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SettingsComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    Geolocation,
    LocationTrackerService,
    BackgroundGeolocation,
    LocationAccuracy,
    VehicleService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
