import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  selected: Vehicle;
  vehicles: Vehicle[] = [];
  scanResult: string;

  constructor(private vehicleService: VehicleService, private storage: Storage, private router: Router, private barcodeScanner: BarcodeScanner) {
  }

  ngOnInit() {
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
      this.storage.get('currentVehicle').then((val) => {
        if (val != null) {
          this.selected = this.vehicles.find(v => v.id === JSON.parse(val).id);
        } else if (this.vehicles.length > 0) {
          this.selected = this.vehicles[0];
        } else {
          this.selected = null;
        }
      });
    });
  }

  onSave() {
    this.vehicleService.setCurrentVehicle(this.selected);
    this.router.navigate(['/home'])
  }

  startScanning() {
    this.scanResult = null;
    this.barcodeScanner.scan({
      preferFrontCamera: false, 
      showFlipCameraButton: true, 
      showTorchButton: true, 
      torchOn: false,
      prompt: "Zeskanuj kod QR samochodu",
      resultDisplayDuration: 1500,
      formats: "QR_CODE,PDF_417"
    }).then(barcodeData => {
      this.scanResult = barcodeData.text;
      let selectedId: number = parseInt(this.scanResult.split('-')[2]);
      this.selected = this.vehicles.find(v => v.id === selectedId);
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
