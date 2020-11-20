import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  addVehicleForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private vehicleService: VehicleService, private router: Router) { }

  ngOnInit(): void {
    this.addVehicleForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      yearOfManufacture: ['', Validators.required],
      licencePlate: ['', Validators.required]
    });
  }

  get f() { return this.addVehicleForm.controls; }

  onSubmit() {
    this.vehicleService.addVehicle(this.f.make.value, this.f.model.value, this.f.yearOfManufacture.value, this.f.licencePlate.value, null).subscribe(vehicle => {
      console.log(vehicle);
    })
  }

  onCancel() {
    this.router.navigate(['/vehicleManagement']);
  }

}
