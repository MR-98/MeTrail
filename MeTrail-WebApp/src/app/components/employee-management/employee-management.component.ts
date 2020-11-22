import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'drivingEfficiencyFactor', 'actions'];
  employees: Employee[] = [];
  datasource;

  constructor(private router: Router, private employeeService: EmployeeService, public dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      this.initTable();
    })
  }

  private initTable() {
    this.datasource = new MatTableDataSource(this.employees);
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  onAddEmployee() {
    this.router.navigate(['/addEmployee']);
  }

  editEmployee(employee) {
    console.log(employee);
  }

  deleteEmployee(employee) {
    this.employeeService.deleteEmployeeById(employee.id).subscribe();
    this.employees.splice(this.employees.indexOf(employee), 1);
    this.initTable();
  }

  openConfirmDialog(employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Potwierdź usunięcie', action: 'Czy jesteś pewien że chcesz usunąć pracownika z bazy danych?', okButtonText: 'Usuń', cancelButtonText: 'Anuluj' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteEmployee(employee);
      }
    });
  }
}
