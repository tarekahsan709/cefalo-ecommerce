import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email = new FormControl('', [
    Validators.email,
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public toast: ToastComponent) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.auth.hasAuthenticated()) {
      this.router.navigateByUrl('/product');
    }
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  setClassEmail(): object {
    return {'has-danger': !this.email.pristine && !this.email.valid};
  }

  setClassPassword(): object {
    return {'has-danger': !this.password.pristine && !this.password.valid};
  }

  login(): void {
    this.auth.login(this.loginForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully logged in!', 'success');
        this.router.navigateByUrl('/product');
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }

}
