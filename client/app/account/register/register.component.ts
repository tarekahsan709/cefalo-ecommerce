import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  email = new FormControl('', [
    Validators.email,
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  isLoggedIn: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService,
              private auth: AuthService) {
    this.auth.loggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
      if (this.isLoggedIn)
        this.router.navigate(['/product'])
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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

  register(): void {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }
}
