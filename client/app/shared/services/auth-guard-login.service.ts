import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardLogin implements CanActivate {

  isLoggedIn: boolean;

  constructor(public auth: AuthService) {
    this.auth.loggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  canActivate(): boolean {
    return this.isLoggedIn;
  }

}
