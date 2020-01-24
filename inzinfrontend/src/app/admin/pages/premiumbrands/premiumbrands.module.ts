import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumbrandsRoutingModule } from './premiumbrands-routing.module';
import { PremiumbrandsPageComponent } from './premiumbrands-page/premiumbrands-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PremiumbrandsPageComponent],
  imports: [
    CommonModule,
    PremiumbrandsRoutingModule,
    SharedModule
  ]
})
export class PremiumbrandsModule { }
