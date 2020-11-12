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

  addEmployee(firstName: string, lastName: string, email: string): Observable<Employee> {
    return this.http.post<Employee>(this.url, {
      fullName: firstName + " " + lastName,
      email: email,
      drivingEfficiencyFactor: 5.0
    }, httpOptions);
  }

  createAccountForEmployee(employee: Employee, password: string): Observable<any> {
    return this.http.post<any>(this.url.replace('employees', 'sign-up'), {
      username: employee.email,
      password: password,
      fullName: employee.fullName,
      role: UserRole.EMPLOYEE
    }, httpOptions);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url+"/all");
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.url+"?employeeId="+employeeId);
  }
}
