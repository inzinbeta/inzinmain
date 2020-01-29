import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsPagesComponent } from './tags-pages/tags-pages.component';


const routes: Routes = [

{
  path:"",
  component:TagsPagesComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
