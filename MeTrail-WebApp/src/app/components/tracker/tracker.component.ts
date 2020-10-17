import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  points = [
    {"latitude": 52.238727, "longitude": 19.337694},
    {"latitude": 52.236833, "longitude": 19.344135},
    {"latitude": 52.234725, "longitude": 19.352906},
    {"latitude": 52.236768, "longitude": 19.352906}
  ]

  lat = this.points[0].latitude;
  lng = this.points[0].longitude;

  constructor() { }

  ngOnInit(): void {
  }

}
