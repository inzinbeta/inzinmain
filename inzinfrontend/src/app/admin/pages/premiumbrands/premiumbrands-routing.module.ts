import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PremiumbrandsPageComponent } from './premiumbrands-page/premiumbrands-page.component';


const routes: Routes = [

  {
    path: '',
    component: PremiumbrandsPageComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumbrandsRoutingModule { }
