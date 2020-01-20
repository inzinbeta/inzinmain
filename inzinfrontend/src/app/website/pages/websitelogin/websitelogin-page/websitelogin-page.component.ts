import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angular-6-social-login";
import { WebsiteAuthService } from 'src/app/auth/websiteauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-websitelogin-page',
  templateUrl: './websitelogin-page.component.html',
  styleUrls: ['./websitelogin-page.component.css']
})
export class WebsiteloginPageComponent implements OnInit {

  constructor(private socialAuthService: AuthService,private websiteauth:WebsiteAuthService,private router:Router) { }


  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
         // will call our own login service from backend register the user 
         // generate the token 

      
      //console.log(this.f.username.value,this.f.password.value);
      this.websiteauth.oauthlogin(userData).subscribe(data=>{
        console.log(data);
        if(data["token"] && data["status"])
        {  
          // checking if the token is present
          // saving the token inside  localstorage
          localStorage.setItem('currentUser', JSON.stringify(data["user"]));
          localStorage.setItem('token', JSON.stringify(data["token"]));
          localStorage.setItem('role', JSON.stringify(data["role"]));
       
          
          //const tokenPayload = decode(data.token);
          

            this.router.navigate(['/dashboard']);
          

        }
       

      })


      }
    );
    return false;
  }

  ngOnInit() {
  }

}
