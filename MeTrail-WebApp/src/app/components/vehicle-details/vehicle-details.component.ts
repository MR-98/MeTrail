import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  vehicleId: number;
  vehicle: Vehicle;
  elementType:NgxQrcodeElementTypes = NgxQrcodeElementTypes.URL;
  correctionLevel:NgxQrcodeErrorCorrectionLevels = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;

  constructor(private vehicleService: VehicleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.vehicleId = parseInt(params.get('vehicleId'));
    });
    this.vehicleService.getVehicleById(this.vehicleId).subscribe(data => {
      this.vehicle = data;
      console.log(data);
      this.value = 'VEHICLE-ID-' + this.vehicle.id;
    });
  }

}
