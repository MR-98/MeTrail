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
import { LocationTrackerService } from 'src/app/services/location-tracker.service';
import { Storage } from '@ionic/storage';
import { Vehicle } from 'src/app/models/Vehicle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  latitude: any = '---'; //latitude
  longitude: any = '---'; //longitude
  interval: any;
  speed: number;
  drivingFactor: number = 0;
  employeeName: string = '';
  currentVehicle;

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation,
    private authService: AuthenticationService,
    private router: Router,
    private locationTracker: LocationTrackerService,
    private storage: Storage
    ) { }

  ngOnInit() {
    this.employeeName = this.authService.currentUserValue.fullName;
    this.currentVehicle = 'test';
  }

  ionViewDidEnter() {
    this.storage.get('currentVehicle').then(val => {
      if(val != null) {
        let vehicle: Vehicle = JSON.parse(val);
        this.currentVehicle = vehicle.licencePlate + ' ' + vehicle.make + ' ' + vehicle.vehicleModel;
      } else {
        this.currentVehicle = '-----';
      }
    })
  } 

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/login'], { skipLocationChange: true });
  }

  onTrackerStart() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false,
      interval: 20000,
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


    this.getCurrentLocationForeground;
    this.interval = setInterval(() => {
      this.getCurrentLocationForeground();
    }, 20000)
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
    // HTTP POST HERE

    this.locationTracker.sendGPS(this.latitude, this.longitude, this.speed).subscribe(data => {
      console.log(data);
    });
  }

  getCurrentLocationForeground() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.speed = resp.coords.speed;

      this.sendGPS();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onSettingsClick() {
    this.router.navigate(['/settings']);
  }
}
