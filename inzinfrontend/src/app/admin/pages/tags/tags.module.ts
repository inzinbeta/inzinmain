import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsPagesComponent } from './tags-pages/tags-pages.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TagsPagesComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    SharedModule
  ]
})
export class TagsModule { }
