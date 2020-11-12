import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAddEmployee() {
    this.router.navigate(['/addEmployee']);
  }
}
