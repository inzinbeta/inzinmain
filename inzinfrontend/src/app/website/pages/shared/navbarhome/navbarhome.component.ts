import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { WebsiteAuthService } from 'src/app/auth/websiteauth.service';
@Component({
  selector: 'app-navbarhome',
  templateUrl: './navbarhome.component.html',
  styleUrls: ['./navbarhome.component.css']
})
export class NavbarhomeComponent implements OnInit {

  preloader=true;
  constructor(

    private router:Router,
    private websiteauth:WebsiteAuthService
    
  ) { 

    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.preloader = true;
        console.log("event started")
      }else if(event instanceof NavigationEnd) {
        this.preloader = false;
        console.log("event end")
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });

  }
  logOut()
  {
  this.websiteauth.logout();
  this.router.navigate(['/login']);
  return false;
  }

  ngOnInit() {
    //this.preloader=false;
  }

 

}
