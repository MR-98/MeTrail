import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { LocationPoint } from 'src/app/models/LocationPoint';
import { EmployeeService } from 'src/app/services/employee.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  points: LocationPoint[] = [];
  employees: Employee[] = []
  loaded: boolean = false;
  initialLatitude: number = 51.75000;
  initialLongitude: number = 19.46667;

  chosenDate: string;
  chosenEmployee: Employee;

  constructor(private employeeService: EmployeeService, private locationService: LocationService) {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  ngOnInit(): void {
    this.locationService.getLocationPointsForEmployeeByDate
  }

  onEmployeeChange(employee: Employee) {
    this.chosenEmployee = employee;
    console.log(this.chosenEmployee);

    if(this.chosenDate) {
      this.updateMap();
    }
  }

  onDateChange(date) {
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();
    this.chosenDate = year + "-" + month + "-" + day;

    if(this.chosenEmployee) {
      this.updateMap();
    }
  }

  updateMap() {
    this.locationService.getLocationPointsForEmployeeByDate(this.chosenEmployee.id, this.chosenDate).subscribe(points => {
      this.points = points;
      this.loaded = true;
    })
  }

}
