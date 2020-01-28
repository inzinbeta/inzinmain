import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerHomeRoutingModule } from './dealerhome-routing.module';
import { DealerhomePageComponent } from './dealerhome-page/dealerhome-page.component';


@NgModule({
  declarations: [DealerhomePageComponent],
  imports: [
    CommonModule,
    DealerHomeRoutingModule
  ]
})
export class DealerHomeModule { }
