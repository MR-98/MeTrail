import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationTrackerService {

  private url: string = 'https://mytrail-2k20.ew.r.appspot.com/location';

  constructor(private http: HTTP, private authService: AuthenticationService) { }

  sendGPS(latitude: number, longitude: number, speed: number) {
    let employeeId = this.authService.currentUserValue.userId;
    let t = new Date();

    let year: string = t.getFullYear().toString().padStart(4, "0");
    let month: string = (t.getMonth()+1).toString().padStart(2, "0");
    let day: string = t.getDate().toString().padStart(2, "0");

    let hour: string = t.getHours().toString().padStart(2, "0");
    let minute: string = t.getMinutes().toString().padStart(2, "0");
    let second: string = t.getSeconds().toString().padStart(2, "0");

    let speedInKmPerHour = speed * 3.6;

    const currentUser = this.authService.currentUserValue;
    this.http.setDataSerializer('json');
    this.http.post(
      this.url, {
        latitude: latitude,
        longitude: longitude,
        speed: speedInKmPerHour,
        employeeId: employeeId,
        time: hour + ":" + minute + ":" + second,
        date: year + "-" + month + "-" + day,
      }, {
        Authorization: `Bearer ${currentUser.token}`,
      }
    )
      .then(response => {
        console.log(response);
      });
  }
}
