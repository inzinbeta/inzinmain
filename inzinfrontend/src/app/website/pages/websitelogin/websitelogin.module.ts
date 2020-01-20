import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteloginRoutingModule } from './websitelogin-routing.module';
import { WebsiteloginPageComponent } from './websitelogin-page/websitelogin-page.component';
import { SharedModule } from '../shared/shared.module';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";


// Configs 
export function getAuthServiceConfigs() {
let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("Your-Facebook-app-id")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("202172479345-c0lgd9khiovedbhg05tgvdf8l4n474eu.apps.googleusercontent.com")
      }
    ]
);
return config;
}


@NgModule({
  declarations: [WebsiteloginPageComponent],
  imports: [
    CommonModule,
    WebsiteloginRoutingModule,
    SharedModule,
    SocialLoginModule
  ],
  providers: [
   {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    
    }
  ],
})
export class WebsiteloginModule { }
