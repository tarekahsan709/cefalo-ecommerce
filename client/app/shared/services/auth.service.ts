import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';
import { ToastComponent } from '../toast/toast.component';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  loggedIn = false;

  currentUser: User = new User();

  constructor(private userService: UserService,
              private router: Router,
              private jwtHelper: JwtHelperService,
              public toast: ToastComponent) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword): void {
    this.userService.login(emailAndPassword).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        this.loggedIn = true;
        this.router.navigate(['/account']);
      },
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token): object {
    return this.jwtHelper.decodeToken(token);
  }

  setCurrentUser(decodedUser): void {
    this.loggedIn = true;
    this.currentUser.id = decodedUser._id;
    this.currentUser.email = decodedUser.email;
  }

}
