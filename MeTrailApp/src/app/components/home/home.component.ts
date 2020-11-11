import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service'
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from "@ionic-native/background-geolocation/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  interval: any;
  speed: number;
  drivingFactor: number = 0;
  employeeName: string = 'Jan Kowalski';

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
   }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onTrackerStart() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10, 
      debug: false,
      interval: 2000,
      stopOnTerminate: false // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          this.latitude = location.latitude;
          this.longitude = location.longitude;
          this.speed = location.speed;

          this.sendGPS();
          this.backgroundGeolocation.finish();
        });
    });

    // start recording location
    this.backgroundGeolocation.start();


    this.interval = setInterval(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.speed = resp.coords.speed;

        this.sendGPS;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    },3000)
  }

  onTrackerStop() {
    this.backgroundGeolocation.stop();
    clearInterval(this.interval);
  }

  sendGPS() {
    if (this.speed == undefined) {
      this.speed = 0;
    }
    let timestamp = new Date();

    console.log(this.latitude);
    console.log(this.longitude);
    console.log(this.speed);
    // HTTP POST HERE
  }
}
