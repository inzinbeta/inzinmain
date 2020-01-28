import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path:'',
    loadChildren:'./website/website.module#WebsiteModule'
  },
 
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },

  {
    path: 'dealer',
    loadChildren: './dealer/dealer.module#DealerModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
