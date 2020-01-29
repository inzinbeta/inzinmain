import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomesliderPagesComponent } from './homeslider-pages/homeslider-pages.component';


const routes: Routes = [
{
  path:"",
  component:HomesliderPagesComponent
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesliderRoutingModule { }
