import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService,
              private router: Router) {
  }

  // FIXME: Need to check why it's not working.
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> {
  //   return this.auth.currentUser$.pipe(
  //     map(auth => {
  //       if (auth) {
  //         return true;
  //       }
  //       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  //     })
  //   );
  // }
  canActivate(): boolean {
    if (!this.auth.hasAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
