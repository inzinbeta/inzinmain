import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebsiteAuthGuard } from './auth/websiteauth-guard.service';
import { WebsiteAuthService } from './auth/websiteauth.service';


@NgModule({
  declarations: [
    AppComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({config: {
      throwNoTokenError: false
    }}),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule // important for forms
   
  ],
  providers: [AuthService,AuthGuard,WebsiteAuthGuard,WebsiteAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
