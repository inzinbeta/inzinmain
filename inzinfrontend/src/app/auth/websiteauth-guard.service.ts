import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { WebsiteAuthService } from './websiteauth.service';

@Injectable()
export class WebsiteAuthGuard implements CanActivate {
  constructor(public auth: WebsiteAuthService, public router: Router) {}
  canActivate(): boolean {
    console.log("isauthentic",this.auth.isAuthenticated())
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}