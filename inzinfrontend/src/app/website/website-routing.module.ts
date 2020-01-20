import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteAuthGuard } from '../auth/websiteauth-guard.service';


const routes: Routes = [

  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule'
  },

  {
    path: 'login',
    loadChildren: './pages/websitelogin/websitelogin.module#WebsiteloginModule'
  },
  {
    path: 'dashboard',
    loadChildren: './pages/userdashboard/userdashboard.module#UserdashboardModule',
    canActivate:[WebsiteAuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
