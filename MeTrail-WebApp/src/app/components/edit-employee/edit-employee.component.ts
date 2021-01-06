import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  editEmployeeForm: FormGroup;
  employeeId: number;
  employee: Employee;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = parseInt(params.get('employeeId'));
    });

    this.editEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    this.employeeService.getEmployeeById(this.employeeId).subscribe(val => {
      this.employee = val;
      let name = this.employee.fullName.split(" ");
      this.editEmployeeForm.setValue({
        firstName: name[0],
        lastName: name[1],
        email: this.employee.email,
        phoneNumber: this.employee.phoneNumber
      })
    })
  }

  get f() { return this.editEmployeeForm.controls; }

  onSubmit() {
    this.employeeService.editEmployee(this.employee.id,
      this.f.firstName.value,
      this.f.lastName.value,
      this.f.email.value,
      this.employee.drivingEfficiencyFactor,
      this.employee.totalTraveledDistanceInKilometers,
      this.employee.applicationUserId,
      this.f.phoneNumber.value).subscribe(() => {
        this.snackBar.open('Dane pracownika zedytowane', 'Zamknij', {
          duration: 3000
        });
    })
  }

  onCancel() {
    this.router.navigate(['/employeeManagement']);
  }

}
