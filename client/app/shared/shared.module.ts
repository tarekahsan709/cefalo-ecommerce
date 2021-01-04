import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from './toast/toast.component';
import { LoadingComponent } from './loading/loading.component';

import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { CartCounterComponent } from './cart-counter/cart-counter.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, NgSelectModule],
  exports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Shared Components
    ToastComponent,
    LoadingComponent,
    CartCounterComponent
  ],
  declarations: [
    ToastComponent,
    LoadingComponent,
    CartCounterComponent
  ],
  providers: [
    UserService,
    ProductService,
    ToastComponent
  ]
})
export class SharedModule {
}
