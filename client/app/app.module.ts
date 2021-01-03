import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string => localStorage.getItem('token'),
        // allowedDomains: ['localhost:3000', 'localhost:4200']
      }
    })
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
}
