import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteloginPageComponent } from './websitelogin-page/websitelogin-page.component';


const routes: Routes = [

  {
    path: '',
    component: WebsiteloginPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteloginRoutingModule { }
