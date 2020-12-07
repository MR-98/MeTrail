import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url:string = 'https://mytrail-2k20.ew.r.appspot.com/employees';

  constructor(private http: HttpClient) { }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.url+"?employeeId="+employeeId, httpOptions);
  }
}
