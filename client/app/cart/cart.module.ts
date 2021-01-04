import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CoreModule } from '../core/core.module';
import { CheckOutComponent } from './check-out/check-out.component';


@NgModule({
  declarations: [CheckOutComponent],
  imports: [CommonModule, CartRoutingModule, CoreModule, SharedModule]
})
export class CartModule {
}
