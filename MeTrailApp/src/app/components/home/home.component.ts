import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { LocationTrackerService } from 'src/app/services/location-tracker.service';
import { Storage } from '@ionic/storage';
import { Vehicle } from 'src/app/models/Vehicle';
import { ToastController } from '@ionic/angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

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
  showProgressBar: boolean = false;
  trackingOn: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private locationTracker: LocationTrackerService,
    private storage: Storage,
    public toastController: ToastController,
    private backgroundGeolocation: BackgroundGeolocation,
    private androidPermissions: AndroidPermissions,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.employeeName = this.authService.currentUserValue.fullName;
    this.currentVehicle = 'test';

    this.checkPermissions();
  }

  ionViewDidEnter() {
    this.storage.get('currentVehicle').then(val => {
      if (val != null) {
        let vehicle: Vehicle = JSON.parse(val);
        this.currentVehicle = vehicle.licencePlate + ' ' + vehicle.make + ' ' + vehicle.vehicleModel;
      } else {
        this.currentVehicle = '-----';
      }
    })
  }

  async checkPermissions() {
    await this.androidPermissions.requestPermissions([
      "android.permission.ACCESS_BACKGROUND_LOCATION",
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
    ]);
  }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/login'], { skipLocationChange: true });
  }

  onSettingsClick() {
    this.router.navigate(['/settings']);
  }

  onTrackerStart() {
    this.showProgressBar = true;
    this.trackingOn = true;
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 0,
      distanceFilter: 0,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
          this.zone.run(() => {
            this.latitude = location.latitude;
            this.longitude = location.longitude;
            this.speed = location.speed;
            this.showProgressBar = false;
          });
          this.sendGPS();
        });
    });

    this.backgroundGeolocation.start();
  }

  onTrackerStop() {
    this.backgroundGeolocation.stop();
    this.backgroundGeolocation.finish();
    this.backgroundGeolocation.removeAllListeners();
    this.backgroundGeolocation.stopWatchingLocationMode();
    this.latitude = '---';
    this.longitude = '---';
    this.trackingOn = false;
  }

  sendGPS() {
    if (this.speed == undefined) {
      this.speed = 0;
    }

    this.locationTracker.sendGPS(this.latitude, this.longitude, this.speed)
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.longitude + ' ' + this.latitude,
      duration: 1000
    });
    toast.present();
  }
}
