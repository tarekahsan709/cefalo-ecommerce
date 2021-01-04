import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ToastComponent } from '../toast/toast.component';
import { IUser } from '../models/user.model';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ErrorObservable } from 'rxjs-compat/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSubject: BehaviorSubject<IUser>;

  constructor(private router: Router,
              private http: HttpClient,
              public toast: ToastComponent,
              public jwtHelperSvc: JwtHelperService) {
    this.userSubject = new BehaviorSubject<IUser>(null);
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('/api/v1/users/register', user).pipe(
      catchError(AuthService.handleError)
    );
  }

  login(credentials): Observable<any> {
    return this.http.post<any>('/api/v1/users/login', credentials).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.userSubject.next(user);
        }
      }),
      catchError(AuthService.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigateByUrl('account/login');
  }

  public hasAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelperSvc.isTokenExpired(token);
  }

  private static handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return ErrorObservable.create(errMessage);
    }
    return ErrorObservable.create(error || 'Node.js server error');
  }

}
