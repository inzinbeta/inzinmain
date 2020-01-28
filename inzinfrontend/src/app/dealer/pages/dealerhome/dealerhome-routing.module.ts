import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealerhomePageComponent } from './dealerhome-page/dealerhome-page.component';


const routes: Routes = [

  {
    path: '',
    component: DealerhomePageComponent,
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerHomeRoutingModule { }
