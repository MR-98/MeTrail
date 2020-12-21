import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/Vehicle';
import { AuthenticationService } from './authentication.service';
import { Storage } from '@ionic/storage';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url: string = 'https://mytrail-2k20.ew.r.appspot.com/vehicles';

  constructor(private http: HttpClient, private authService: AuthenticationService, private storage: Storage) {
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.url + "/getAll");
  }

  setCurrentVehicle(vehicle: Vehicle) {
    this.storage.set('currentVehicle', JSON.stringify(vehicle));
  }

  setCurrentUser(vehicleId: number): Observable<Vehicle> {
    let currentUser = this.authService.currentUserValue;

    return this.http.post<Vehicle>(this.url + "/setCurrentUser?vehicleId=" + vehicleId + "&currentUser=" + currentUser.fullName,
      {},
      httpOptions);
  }
}
