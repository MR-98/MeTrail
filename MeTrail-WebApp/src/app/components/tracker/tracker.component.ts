import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { EmployeeWorkStats } from 'src/app/models/EmployeeWorkStats';
import { LocationPoint } from 'src/app/models/LocationPoint';
import { EmployeeService } from 'src/app/services/employee.service';
import { LocationService } from 'src/app/services/location.service';
import { WorkStatsService } from 'src/app/services/work-stats.service';

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
  employeeStats: EmployeeWorkStats;

  chosenDate: string;
  chosenEmployee: Employee;

  constructor(private employeeService: EmployeeService, private locationService: LocationService, private employeeStatsService: WorkStatsService) {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  ngOnInit(): void {
    this.locationService.getLocationPointsForEmployeeByDate
  }

  onEmployeeChange(employee: Employee) {
    this.chosenEmployee = employee;

    if (this.chosenDate) {
      this.updateMap();
    }
  }

  onDateChange(date) {
    let year: string = date.getFullYear().toString().padStart(4, "0");
    let month: string = (date.getMonth()+1).toString().padStart(2, "0");
    let day: string = date.getDate().toString().padStart(2, "0");
    this.chosenDate = year + "-" + month + "-" + day;

    if (this.chosenEmployee) {
      this.updateMap();
    }
  }

  updateMap() {
    this.loaded = false;
    this.locationService.getLocationPointsForEmployeeByDate(this.chosenEmployee.id, this.chosenDate).subscribe(points => {
      if (points.length > 0) {
        this.points = points;
        this.loaded = true;
        this.updateStats();
      }
    })
  }

  updateStats() {
    this.employeeStatsService.getStatsForEmployee(this.chosenEmployee.id, this.chosenDate).subscribe(data => {
      this.employeeStats = data;
    })
  }

  getIconUrl(index: number) {
    if (index == 0) {
      return '../../../assets/pins/pinGreen.png';
    } else if(index == this.points.length - 1) {
      return '../../../assets/pins/pinRed.png';
    } else {
      return '../../../assets/pins/pinBlue.png';
    }
  }

  onMouseOver(infoWindow) {
    infoWindow.open();
  }

  onMouseOut(infoWindow) {
    infoWindow.close();
  }

}
