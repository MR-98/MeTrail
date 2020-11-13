import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'drivingEfficiencyFactor'];
  employees: Employee[] = [];
  datasource;

  constructor(private router: Router, private employeeService: EmployeeService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      this.datasource = new MatTableDataSource(this.employees);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  onAddEmployee() {
    this.router.navigate(['/addEmployee']);
  }
}
