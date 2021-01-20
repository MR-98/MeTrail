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

  pointsA: LocationPoint[] = [];
  pointsB: LocationPoint[] = [];
  employees: Employee[] = [];
  loaded: boolean = false;
  initialLatitude: number = 51.75000;
  initialLongitude: number = 19.46667;
  employeeStats: EmployeeWorkStats[] = [];
  statsCounter: number;

  chosenDate: string;
  chosenEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private locationService: LocationService, private employeeStatsService: WorkStatsService) {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  ngOnInit(): void {
  }

  onEmployeeChange(selectedEmployees: Employee[]) {
    this.chosenEmployees = selectedEmployees;
    this.loaded = false;
  }

  onDateChange(date) {
    this.loaded = false;
    let year: string = date.getFullYear().toString().padStart(4, "0");
    let month: string = (date.getMonth() + 1).toString().padStart(2, "0");
    let day: string = date.getDate().toString().padStart(2, "0");
    this.chosenDate = year + "-" + month + "-" + day;
  }

  onSubmit() {
    this.loaded = false;
    this.pointsA = [];
    this.pointsB = [];

    this.locationService.getLocationPointsForEmployeeByDate(this.chosenEmployees[0].id, this.chosenDate).subscribe(points => {
      if (points.length > 0) {
        this.pointsA = points;
        this.loaded = true;
      }
      if(this.chosenEmployees.length> 1) {
        this.locationService.getLocationPointsForEmployeeByDate(this.chosenEmployees[1].id, this.chosenDate).subscribe(pointsB => {
          if (pointsB.length > 0) {
            this.pointsB = pointsB;
            this.loaded = true;
          }
        })
      }
      this.updateStats();
    })
  }

  updateStats() {
    this.statsCounter = this.chosenEmployees.length;
    this.employeeStats = [];
    this.employeeStatsService.getStatsForEmployee(this.chosenEmployees[0].id, this.chosenDate).subscribe(first => {
      this.employeeStats[0] = first;
      if (this.chosenEmployees.length > 1) {
        this.employeeStatsService.getStatsForEmployee(this.chosenEmployees[1].id, this.chosenDate).subscribe(second => {
          this.employeeStats[1] = second;
        })
      }
    })
  }

  getIconUrl(index: number, pointsSet: string) {
    if (pointsSet === "A") {
      if (index == 0) {
        return '../../../assets/pins/pinGreen.png';
      } else if (index == this.pointsA.length - 1) {
        return '../../../assets/pins/pinRed.png';
      } else {
        return 'none';
      }
    } else {
      if (index == 0) {
        return '../../../assets/pins/pinGreen.png';
      } else if (index == this.pointsB.length - 1) {
        return '../../../assets/pins/pinRed.png';
      } else {
        return 'none';
      }
    }
  }

  onMouseOver(infoWindow) {
    infoWindow.open();
  }

  onMouseOut(infoWindow) {
    infoWindow.close();
  }

}
