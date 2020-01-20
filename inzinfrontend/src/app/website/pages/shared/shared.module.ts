import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterhomeComponent } from './footerhome/footerhome.component';
import { NavbarhomeComponent } from './navbarhome/navbarhome.component';
import { RouterModule } from '@angular/router';






@NgModule({
  declarations: [FooterhomeComponent, NavbarhomeComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
  ,exports:[FooterhomeComponent,  RouterModule,NavbarhomeComponent] // This export is necessary such that footer can be used in every componet under page
})
export class SharedModule { }
