import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { last } from 'rxjs/operators';
import { Employee } from '../models/Employee';
import { UserRole } from '../models/UserRole';

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

  createAccountForEmployee(username: string, email: string, fullName: string, password: string): Observable<any> {
    return this.http.post<any>(this.url.replace('employees', 'auth/signUp'), {
      username: username,
      email: email,
      password: password,
      fullName: fullName,
      role: [UserRole.EMPLOYEE]
    }, httpOptions);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url+"/all");
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.url+"?employeeId="+employeeId, httpOptions);
  }

  getEmployeeByEmail(email: string) :Observable<Employee> {
    return this.http.get<Employee>(this.url+"/byEmail?employeeEmail="+email, httpOptions);
  }

  editEmployee(employeeId: number,
    firstName: string,
    lastName: string,
    email: string,
    drivingEfficiencyFactor: number,
    totalTraveledDistanceInKilometers: number,
    applicationUserId: number,
    phoneNumber: string): Observable<Employee> {
    return this.http.put<Employee>(this.url, {
      id: employeeId,
      fullName: firstName + " " + lastName,
      email: email,
      drivingEfficiencyFactor: drivingEfficiencyFactor,
      totalTraveledDistanceInKilometers: totalTraveledDistanceInKilometers,
      applicationUserId: applicationUserId,
      phoneNumber: phoneNumber
    }, httpOptions);
  }

  deleteEmployeeById(employeeId: number): Observable<any> {
    return this.http.delete<any>(this.url+'?employeeId='+employeeId, httpOptions);
  }
}
