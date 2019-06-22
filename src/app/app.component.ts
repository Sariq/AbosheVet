import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
import { SessionStorageService } from 'ngx-webstorage';
import { PostService } from '../post/post-service';
import { PetsList } from '../pets/pets-list/pets-list';
import { AuthService } from '../auth/auth-service';
import { PetsAdd } from '../pets/pets-add/pets-add';
import { PetsVaccination } from '../pets/pets-vaccination/pets-vaccination';
import { PostList } from '../post/post-list/post-list';
import { UserProfileService } from '../common/services/user-profile.service';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PetsList;
  pages: Array<{title: string, component: any}>;
  UserProfile;
  constructor(public platform: Platform,private authService:AuthService,private postService:PostService, public statusBar: StatusBar, public splashScreen: SplashScreen,private fb: Facebook,private SessionStorage: SessionStorageService,private userProfileService:UserProfileService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'דף ראשי', component: HomePage },
      { title: 'החיות שלי', component: PetsList }
    ];

  }
  userFbData;
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

  this.fb.getLoginStatus().then((res) => {
    if (res.status === 'connected') {
      
        //Already logged in to FB so pass credentials to provider (in my case firebase)
      console.log('connected')
      let userFbData={
        userID:"10156447597321166",
        Name:"10156447597321166",
        ImageUrl:"Sari Qashuw",
        Email:"sari.q@live.com"
    }
    
    this.authService.getClient(res.authResponse.userID).subscribe((res) => {
      console.log(res);
      if(res){
        this.UserProfile=res;
        this.userProfileService.setUserProfile(res);
      }else{
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', []).then(profile => {
         // this.userFbData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'],accessToken:res.authResponse['accessToken'],userID:res.authResponse['userID']};
         this.userFbData={
            userID  :profile.id,
            Name : profile.name,
            ImageUrl:profile.picture.data.url,
            Email : profile.email
        };
        this.UserProfile = this.userFbData;
        this.userProfileService.setUserProfile(this.userFbData);
          this.authService.registerUser(this.userFbData);//.subscribe(res=>console.log(res));
          console.log(this.userFbData)
           //if(this.userFbData)
         // this.postService.getPosts().subscribe(res=>console.log(res));
    
        });
        //this.authService.registerUser(userFbData)//this.userFbData);//.subscribe(res=>console.log(res));
      }
    });
  } else {
    if (res.status !== 'unknown' || true) {
      this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => { 
        console.log('Logged into Facebook!', res)
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          this.UserProfile = {Email: profile['email'], Name: profile['first_name'], ImageUrl: profile['picture_large']['data']['url'], username: profile['name'],accessToken:res.authResponse['accessToken'],userID:res.authResponse['userID']};
          this.authService.getClient(this.UserProfile.userID).subscribe((res) => {

          this.userProfileService.setUserProfile(res);
          this.UserProfile = res;
          this.authService.registerUser(this.UserProfile);//.subscribe(res=>console.log(res));
          console.log(this.UserProfile)
           //if(this.userFbData)
         // this.postService.getPosts().subscribe(res=>console.log(res));
        });
        });
      })
      .catch(e => console.log('Error logging into Facebook', e));
    }
  }
  });
     
  
  // this.authService.getClient(null).subscribe((res) => {
  //   console.log(res);
  //   this.UserProfile=res;
  //   this.userProfileService.setUserProfile(res);
  // });

  
    });
  }
  ngOnInit() {
  
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
