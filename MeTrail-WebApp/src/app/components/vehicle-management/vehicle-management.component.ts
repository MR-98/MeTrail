import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent implements OnInit {

  displayedColumns: string[] = ['id', 'make', 'vehicleModel', 'yearOfManufacture', 'licencePlate', 'estimatedMileage', 'currentUser', 'actions'];
  vehicles: Vehicle[] = [];
  datasource;

  constructor(private router: Router, private vehicleService: VehicleService, public dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
      console.log(vehicles);
      this.initTable();
    })
  }

  private initTable() {
    this.datasource = new MatTableDataSource(this.vehicles);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
  }

  onAddVehicle() {
    this.router.navigate(['/addVehicle']);
  }

  editVehicle(vehicle) {
    this.router.navigate(['/editVehicle'], {queryParams: {vehicleId: vehicle.id}});
  }

  deleteVehicle(vehicle) {
    this.vehicleService.deleteVehicle(vehicle.id).subscribe();
    this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
    this.initTable();
  }

  openConfirmDialog(vehicle): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Potwierdź usunięcie', action: 'Czy jesteś pewien że chcesz usunąć pojazd z bazy danych?', okButtonText: 'Usuń', cancelButtonText: 'Anuluj' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteVehicle(vehicle);
      }
    });
  }

}
