import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { PetsService } from '../pets-service';
import { UserProfileService } from '../../common/services/user-profile.service';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'pets-vaccination',
  templateUrl: './pets-vaccination.html'
})
export class PetsVaccination {
  isVaccineClicked:boolean=false;
  isVaccineSelected:boolean=false;

  
  constructor(public platform: Platform,public navCtrl: NavController,private petsService:PetsService, private userProfileService:UserProfileService,private authService:AuthService) {

  
  }

  pet;
  puppiesNextDate;
  bigNextDate;
  wormNextDate;
  fleaNextDate;
  rabiesNextDate;
  scheduleNotification() {
 
  }
  ngOnInit() {
    this.pet=this.petsService.getSelectedPet();
    this.initVaccinationNextDate();
  
        this.scheduleNotification();
       
    
     }
    
  initVaccinationNextDate(){
    this.puppiesNextDate = this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 1) ? new Date(this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 1)) : null;
    this.bigNextDate = this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 2) ? new Date(this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 2)) : null;
    this.wormNextDate = this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 3) ? new Date(this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 3)) : null;
    this.fleaNextDate = this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 4) ? new Date(this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 4)) : null;
    this.rabiesNextDate = this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 5) ? new Date(this.petsService.getVaccinationNextDateByType(this.pet.VaccinationList, 5)) : null;

  }
  onAddVaccine(){
    this.isVaccineClicked=true;
  }

  onAddVaccineType(type){
    this.petsService.addVaccination(type, this.pet).subscribe(data =>{
        let userProfile=this.userProfileService.getUserProfile();
        let userId=userProfile.UserName;
        this.authService.getClient(userId).subscribe((res) => {
          this.userProfileService.setUserProfile(res);
          this.pet = this.petsService.getPetById(this.pet._id);
          this.initVaccinationNextDate();
        });
    });
    this.isVaccineSelected=true;
  }
 onUpdateVaccine(){
      
  }

}
