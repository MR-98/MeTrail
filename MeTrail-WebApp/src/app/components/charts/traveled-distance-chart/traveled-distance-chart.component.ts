import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-traveled-distance-chart',
  templateUrl: './traveled-distance-chart.component.html',
  styleUrls: ['./traveled-distance-chart.component.css']
})
export class TraveledDistanceChartComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Przejechany dystans [km]'
    },
    legend: {
      display: false,
    }
  };
  public chartType = 'bar';
  public chartLabels = [];
  public chartData = [];
  public chartColors: Color[] = [{ backgroundColor: 'DarkCyan' }]

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.chartData = employees.map(emp => emp.totalTraveledDistanceInKilometers);
      this.chartLabels = employees.map(emp => emp.fullName);
    })
  }

}
