import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserdashboardRoutingModule } from './userdashboard-routing.module';
import { UserdashboardPagesComponent } from './userdashboard-pages/userdashboard-pages.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [UserdashboardPagesComponent],
  imports: [
    CommonModule,
    UserdashboardRoutingModule,
    SharedModule
  ]
})
export class UserdashboardModule { }
