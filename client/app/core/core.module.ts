import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, BrowserModule, SharedModule],
  exports: [NavbarComponent]
})
export class CoreModule {
}
