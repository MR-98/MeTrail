import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationPoint } from '../models/LocationPoint';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private url: string = 'https://mytrail-2k20.ew.r.appspot.com/location';

  constructor(private http: HttpClient) { }

  getLocationPointsForEmployeeByDate(employeeId: number, date: string): Observable<LocationPoint[]> {
    console.log(employeeId);
    return this.http.get<LocationPoint[]>(this.url + "/forEmployeeByDate?employeeId=" + employeeId + "&date=" + date);
  }
}
