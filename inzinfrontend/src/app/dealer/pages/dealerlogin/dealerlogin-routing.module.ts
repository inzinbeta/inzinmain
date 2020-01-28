import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealerloginPageComponent } from './dealerlogin-page/dealerlogin-page.component';


const routes: Routes = [

  {
    path: '',
    component: DealerloginPageComponent,
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerLoginRoutingModule { }
