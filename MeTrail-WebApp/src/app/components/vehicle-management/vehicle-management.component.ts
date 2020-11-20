import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent implements OnInit {

  displayedColumns: string[] = ['id', 'make', 'vehicleModel', 'yearOfManufacture', 'licencePlate', 'currentUser'];
  vehicles: Vehicle[] = [];
  datasource;

  constructor(private router: Router, private vehicleService: VehicleService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
      console.log(vehicles);
      this.datasource = new MatTableDataSource(this.vehicles);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  onAddVehicle() {
    this.router.navigate(['/addVehicle']);
  }

}
