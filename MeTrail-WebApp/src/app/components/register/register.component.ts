import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  placeholder = {
    username: 'Nazwa użytkownika',
    password: 'Hasło',
    repeatPassword: 'Powtórz hasło',
    email: 'Email',
    fullName: "Imię i nazwisko"
  };

  registerForm: FormGroup;
  errorMsg: string;
  validForm: boolean = true;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      email: ['', Validators.required],
      fullName: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.validForm = true;

    if(this.f.password.value != this.f.repeatPassword.value) {
      this.errorMsg = "Podane hasła się różnią";
      this.validForm = false;
    } else if(this.f.password.value.length < 8) {
      this.errorMsg = "Podane hasło jest za krótnie";
      this.validForm = false;
    } else if(!this.f.fullName.valid || !this.f.email.valid || !this.f.username.valid) {
      this.errorMsg = "Pola nie mogą być puste";
      this.validForm = false;
    } else {
      this.authService.register(this.f.username.value, this.f.fullName.value, this.f.password.value, this.f.email.value).subscribe(()=> {
        this.router.navigate(['/login']);
      });
    }
  }

}
