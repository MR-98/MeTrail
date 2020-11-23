import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
providedIn: 'root'
})
export class LocationTrackerService {

  private url:string = 'https://mytrail-2k20.ew.r.appspot.com/location';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  sendGPS(latitude: number, longitude: number, speed: number): Observable<any> {
    let employeeId = this.authService.currentUserValue.userId;
    let time = new Date();

    return this.http.post<any>(this.url, {
      latitude: latitude,
      longitude: longitude,
      speed: speed,
      employeeId: employeeId,
      time: time
    }, httpOptions);
  }
}
