import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  isLoggedIn: boolean;

  constructor(public auth: AuthService) {
    this.auth.loggedIn.subscribe( isLoggedIn => this.isLoggedIn = isLoggedIn);
  }


}
