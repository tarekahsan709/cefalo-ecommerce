import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';
import { ToastComponent } from '../toast/toast.component';
import { IUser } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn: Observable<boolean>;

  token: string;

  currentUser: IUser = new IUser();

  constructor(private userService: UserService,
              private router: Router,
              private jwtHelper: JwtHelperService,
              public toast: ToastComponent) {
    this.loggedInSubject = new BehaviorSubject<boolean>(false);
    this.loggedIn = this.loggedInSubject.asObservable();

    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedUser = this.decodeUserFromToken(this.token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword): void {
    this.userService.login(emailAndPassword).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        this.loggedInSubject.next(true);
        this.router.navigate(['product']);
      },
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
    this.currentUser = new IUser();
    this.router.navigate(['/login']);
  }

  decodeUserFromToken(token): object {
    return this.jwtHelper.decodeToken(token);
  }

  setCurrentUser(decodedUser): void {
    this.loggedInSubject.next(true);
    this.currentUser.id = decodedUser._id;
    this.currentUser.email = decodedUser.email;
  }

  getAuthHeader(): string {
    return this.token;
  }
}
