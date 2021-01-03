// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
// Services

@NgModule({
  declarations: [LoginComponent, LogoutComponent, RegisterComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
  providers: []
})
export class AccountModule {
}
