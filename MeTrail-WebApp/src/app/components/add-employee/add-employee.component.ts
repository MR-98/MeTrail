import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  get f() { return this.addEmployeeForm.controls; }

  onSubmit() {
    this.employeeService.createAccountForEmployee(this.f.username.value,
      this.f.email.value,
      this.f.firstName.value + ' ' + this.f.lastName.value,
      this.f.password.value).subscribe(val => {
      this.employeeService.getEmployeeByEmail(this.f.email.value).subscribe(employee => {
        this.employeeService.editEmployee(employee.id,
          this.f.firstName.value,
          this.f.lastName.value,
          employee.email,
          employee.drivingEfficiencyFactor,
          employee.totalTraveledDistanceInKilometers,
          employee.applicationUserId,
          this.f.phoneNumber.value).subscribe(e => {
            console.log("DONE");
          })
      })
    })
  }

  onCancel() {
    this.router.navigate(['/employeeManagement']);
  }

}
