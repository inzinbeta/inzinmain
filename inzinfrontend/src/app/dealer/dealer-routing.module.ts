import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: 'dashboard',
    loadChildren: './pages/dealerhome/dealerhome.module#DealerHomeModule',
    //canActivate:[AuthGuard],
  },
  {
    path: 'login',
    loadChildren: './pages/dealerlogin/dealerlogin.module#DealerLoginModule',
    //canActivate:[AuthGuard],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRoutingModule { }
