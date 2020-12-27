import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-mileage-chart',
  templateUrl: './vehicle-mileage-chart.component.html',
  styleUrls: ['./vehicle-mileage-chart.component.css']
})
export class VehicleMileageChartComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Estymowany przebieg [km]'
    },
    legend: {
      display: false,
    }
  };
  public chartType = 'bar';
  public chartLabels = [];
  public chartData = [];
  public chartColors: Color[] = [{ backgroundColor: 'CornflowerBlue' }]

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.chartData = vehicles.map(v => v.estimatedMileage);
      this.chartLabels = vehicles.map(v => v.licencePlate + " " + v.make + " " + v.vehicleModel);
    })
  }

}
