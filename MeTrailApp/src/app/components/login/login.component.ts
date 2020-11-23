import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  placeholder = {
    email: 'Email',
    password: 'Hasło'
  };

  returnUrl: string;
  loginForm: FormGroup;

  loading: boolean = true;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage: Storage) {

    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }

    this.storage.get("email").then((email) => {
      this.storage.get("password").then((password) => {
        if (email != null && password != null) {
          this.login(email, password);
        } else {
          this.loading = false;
        }
      })
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberCheckbox: [false]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.loading = true;
    if (this.f.rememberCheckbox.value) {
      this.storage.set("email", this.f.email.value);
      this.storage.set("password", this.f.password.value);
    }

    this.login(this.f.email.value, this.f.password.value);
  }

  private login(email: string, password: string) {
    this.authService.login(email, password)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.loginForm.reset();
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        });
  }

}
