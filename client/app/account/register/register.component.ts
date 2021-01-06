import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import RoutesUrl from 'client/app/shared/util/routes-url';
import ToastMessage from 'client/app/shared/util/toast-message';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  email = new FormControl('', [
    Validators.email,
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  logoutSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.auth.hasAuthenticated()) {
      this.router.navigateByUrl(RoutesUrl.PRODUCT);
    }
  }

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  setClassEmail(): object {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword(): object {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  register(): void {
    this.logoutSubscription = this.auth.register(this.registerForm.value).subscribe((res) => {
      this.toastr.success(ToastMessage.SUCCESSFULL_REGISTRATION);
      this.router.navigateByUrl(RoutesUrl.LOGIN);
    });
  }
}
