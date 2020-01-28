import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerLoginRoutingModule } from './dealerlogin-routing.module';
import { DealerloginPageComponent } from './dealerlogin-page/dealerlogin-page.component';


@NgModule({
  declarations: [DealerloginPageComponent],
  imports: [
    CommonModule,
    DealerLoginRoutingModule
  ]
})
export class DealerLoginModule { }
