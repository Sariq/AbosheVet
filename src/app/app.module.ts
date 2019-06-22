import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PostList } from '../post/post-list/post-list';
import { LoginCmp } from '../auth/login/login';
import { Facebook } from '@ionic-native/facebook';
import { PostService } from '../post/post-service';
import { HttpClientModule } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { PetsService } from '../pets/pets-service';
import { PetsList } from '../pets/pets-list/pets-list';
import { PetsItem } from '../pets/pets-item/pets-item';
import { PetsAdd } from '../pets/pets-add/pets-add';
import { PetsVaccination } from '../pets/pets-vaccination/pets-vaccination';
import { AuthService } from '../auth/auth-service';
import { UserProfileService } from '../common/services/user-profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PostList,
    LoginCmp,
    PetsList,
    PetsItem,
    PetsAdd,
    PetsVaccination
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    Ng2Webstorage,
    
    ReactiveFormsModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dt4rqmonn', upload_preset: 'uhhzyhbg'}),
    FileUploadModule
  

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PostList,
    LoginCmp,
    PetsList,
    PetsItem,
    PetsAdd,
    PetsVaccination
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    PostService,
    PetsService,
    AuthService,
    UserProfileService
  ]
})
export class AppModule {}
