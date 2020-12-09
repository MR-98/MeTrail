import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-driving-factor-chart',
  templateUrl: './driving-factor-chart.component.html',
  styleUrls: ['./driving-factor-chart.component.css']
})
export class DrivingFactorChartComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Współczynnik efektywności jazdy'
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          suggestedMax: 10
        }
      }]
    }
  };
  public chartType = 'bar';
  public chartLabels = [];
  public chartData = [];
  public chartColors: Color[] = [{ backgroundColor: '#31bbe6' }]

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.chartData = employees.map(emp => emp.drivingEfficiencyFactor);
      this.chartLabels = employees.map(emp => emp.fullName);
    })
  }

}
