import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomesliderRoutingModule } from './homeslider-routing.module';
import { HomesliderPagesComponent } from './homeslider-pages/homeslider-pages.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HomesliderPagesComponent],
  imports: [
    CommonModule,
    HomesliderRoutingModule,
    SharedModule
  ]
})
export class HomesliderModule { }
