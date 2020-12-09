import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { EmployeeService } from 'src/app/services/employee.service';
import { WorkStatsService } from 'src/app/services/work-stats.service';

@Component({
  selector: 'app-work-time-chart',
  templateUrl: './work-time-chart.component.html',
  styleUrls: ['./work-time-chart.component.css']
})
export class WorkTimeChartComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Czas pracy w ostatnich 30 dniach [h]'
    },
    legend: {
      display: false,
    }
  };
  public chartType = 'bar';
  public chartLabels = [];
  public chartData = [];
  public chartColors: Color[] = [{ backgroundColor: 'Blue' }]

  constructor(private employeeService: EmployeeService, private workStatsService: WorkStatsService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.workStatsService.getAllStatsInLast30Days().subscribe(stats => {
        let newEmployees = employees.map(e => {
          let newEmployee = { id: e.id, fullName: e.fullName, totalWorkHours: 0.0 };
          return newEmployee;
        })

        console.log(newEmployees);
        console.log(stats);

        stats.forEach(s => {
          newEmployees.find(({ id }) => id === s.employeeId).totalWorkHours += s.workTimeInHours;
          console.log(s.workTimeInHours);
        })
        this.chartData = newEmployees.map(e => e.totalWorkHours);
        this.chartLabels = newEmployees.map(e => e.fullName);
      })

    })
  }

}
