// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Services
import { AuthGuardLogin } from './shared/services/auth-guard-login.service';
// Components
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((module) => module.AccountModule),
  },
  {
    path: 'notfound',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
