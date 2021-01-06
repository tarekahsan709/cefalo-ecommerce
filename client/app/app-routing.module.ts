import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/login',
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((module) => module.AccountModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((module) => module.ProductModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((module) => module.CartModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/account/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
