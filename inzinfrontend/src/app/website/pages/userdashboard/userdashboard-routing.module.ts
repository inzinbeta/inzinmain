import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdashboardPagesComponent } from './userdashboard-pages/userdashboard-pages.component';


const routes: Routes = [
  {
    path: '',
    component:UserdashboardPagesComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdashboardRoutingModule { }
