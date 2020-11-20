import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/Vehicle';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url:string = 'https://mytrail-2k20.ew.r.appspot.com/vehicles';

  constructor(private http: HttpClient) { }

  addVehicle(make: string, vehicleModel: string, yearOfManufacture: number, licencePlate: string, currentVehicleUser: string): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.url, {
      make: make,
      vehicleModel: vehicleModel,
      yearOfManufacture: yearOfManufacture,
      licencePlate: licencePlate,
      currentVehicleUser: currentVehicleUser
    }, httpOptions);
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.url+"/getAll");
  }
}
