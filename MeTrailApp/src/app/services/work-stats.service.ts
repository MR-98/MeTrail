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

  constructor(private http: HttpClient){ }

  startWork(employeeId: number, vehicleId: number) : Observable<EmployeeWorkStats> {
    let t = new Date();

    let year: string = t.getFullYear().toString().padStart(4, "0");
    let month: string = (t.getMonth()+1).toString().padStart(2, "0");
    let day: string = t.getDate().toString().padStart(2, "0");

    let hour: string = t.getHours().toString().padStart(2, "0");
    let minute: string = t.getMinutes().toString().padStart(2, "0");
    let second: string = t.getSeconds().toString().padStart(2, "0");

    let date: string = year+'-'+month+'-'+day;
    let time: string = hour+':'+minute+':'+second;

    return this.http.post<EmployeeWorkStats>(this.url+'/startWorking?'+'employeeId='+employeeId+'&vehicleId='+vehicleId+'&date='+date+'&time='+time, {}, httpOptions);
  }

  stopWork(workStatsId: number) : Observable<EmployeeWorkStats> {
    let t = new Date();
  
      let hour: string = t.getHours().toString().padStart(2, "0");
      let minute: string = t.getMinutes().toString().padStart(2, "0");
      let second: string = t.getSeconds().toString().padStart(2, "0");

      let time: string = hour+':'+minute+':'+second;
  
      return this.http.post<EmployeeWorkStats>(this.url+'/stopWorking?'+'workStatsId='+workStatsId+'&time='+time, {}, httpOptions);
  }
}


