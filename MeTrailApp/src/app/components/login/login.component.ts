import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { EmployeeService } from 'src/app/services/employee.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  placeholder = {
    username: 'Nazwa użytkownika',
    password: 'Hasło'
  };

  returnUrl: string;
  loginForm: FormGroup;

  loading: boolean = true;
  displayError: boolean = false;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private employeeService: EmployeeService) {

    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }

    this.storage.get("username").then((username) => {
      this.storage.get("password").then((password) => {
        if (username != null && password != null) {
          this.login(username, password);
        } else {
          this.loading = false;
        }
      })
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberCheckbox: [false]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.loading = true;
    this.displayError = false;
    if (this.f.rememberCheckbox.value) {
      this.storage.set("username", this.f.username.value);
      this.storage.set("password", this.f.password.value);
    }

    this.login(this.f.username.value, this.f.password.value);
  }

  private login(username: string, password: string) {
    this.authService.login(username, password)
      .pipe(first())
      .subscribe(
        user => {
          this.employeeService.getEmployeeByEmail(user.email).subscribe(employee=> {
            user.id = employee.id;
            this.authService.updateUser(user);
            this.loading = false;
            this.loginForm.reset();
            this.router.navigate(['/home']);
          })
        },
        error => {
          this.loading = false;
          console.log("should display error");
          this.displayError = true;
        });
  }

}
