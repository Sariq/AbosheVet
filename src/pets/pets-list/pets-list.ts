import { PetsAdd } from './../pets-add/pets-add';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PetsService } from '../pets-service';
import { PetsItem } from '../pets-item/pets-item';
import { AuthService } from '../../auth/auth-service';
import { UserProfileService } from '../../common/services/user-profile.service';

@Component({
  selector: 'pets-list',
  templateUrl: './pets-list.html'
})
export class PetsList {
  userProfile;
  petsList;
  constructor(public navCtrl: NavController,private petsService:PetsService,private authService:AuthService,private userProfileService:UserProfileService) {
  }

  onPetSelect(pet){
    this.petsService.setSelectedPet(pet);
  
      this.navCtrl.push(PetsItem)
  
    
    // let userFbData={
    //   ID:"10156447597321166",
    //   Name:"SariQashuw",
    //   ImageUrl:"url",
    //   Email:"sari.q@live.com"
  //}
  //this.authService.registerUser(userFbData);
  }
  onPetAdd(){
    this.navCtrl.push(PetsAdd)
  }

  ngOnInit(){
    this.userProfile=this.userProfileService.getUserProfile();
    if(this.userProfile){
      this.petsList=this.userProfile.PetsList;
    }
    this.userProfileService.userProfileUpdated.subscribe(isOpen => {
      this.userProfile=this.userProfileService.getUserProfile();
      this.petsList=this.userProfile.PetsList;
    });

  }

}
