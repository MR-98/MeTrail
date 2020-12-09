import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeWorkStats } from '../models/EmployeeWorkStats';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WorkStatsService {

  private url: string = 'https://mytrail-2k20.ew.r.appspot.com/workStats';


  constructor(private http: HttpClient) { }

  getStatsForEmployee(employeeId: number, date: string): Observable<EmployeeWorkStats> {
    return this.http.get<EmployeeWorkStats>(this.url + '/getByEmployeeIdAndDate?employeeId=' + employeeId + '&date=' + date, httpOptions);
  }

  getAllStatsInLast30Days() : Observable<EmployeeWorkStats[]> {
    return this.http.get<EmployeeWorkStats[]>(this.url+"/getWorkStatsInLast30Days");
  }
}
