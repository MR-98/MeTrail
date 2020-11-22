import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  editVehicleForm: FormGroup;
  vehicleId: number;
  vehicle: Vehicle;

  constructor(private formBuilder: FormBuilder, private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.vehicleId = parseInt(params.get('vehicleId'));
      console.log(this.vehicleId);
    });

    this.editVehicleForm = this.formBuilder.group({
      make: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      yearOfManufacture: ['', Validators.required],
      licencePlate: ['', Validators.required]
    });

    this.vehicleService.getVehicleById(this.vehicleId).subscribe(val => {
      this.vehicle = val;
      this.editVehicleForm.setValue({
        make: this.vehicle.make,
        vehicleModel: this.vehicle.vehicleModel,
        yearOfManufacture: this.vehicle.yearOfManufacture,
        licencePlate: this.vehicle.licencePlate
      });

      console.log(this.editVehicleForm);
    })
  }

  get f() { return this.editVehicleForm.controls; }

  onSubmit() {
    this.vehicleService.editVehicle(this.vehicleId, this.f.make.value, this.f.vehicleModel.value, this.f.yearOfManufacture.value, this.f.licencePlate.value, null).subscribe(vehicle => {
      console.log(vehicle);
    });
  }

  onCancel() {
    this.router.navigate(['/vehicleManagement']);
  }

}
