import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PetsService } from '../pets-service';
import { PetsVaccination } from '../pets-vaccination/pets-vaccination';

@Component({
  selector: 'pets-item',
  templateUrl: './pets-item.html'
})
export class PetsItem {

  pet: any;
  constructor(public navCtrl: NavController,private petsService:PetsService) {
  }

  onVaccinationClick(){
    this.navCtrl.push(PetsVaccination)
  }
  age;
  ngOnInit() {
    this.pet=this.petsService.getSelectedPet();
    let currentYear= new Date().getFullYear();
    this.age = currentYear - this.pet.dateOfBirth;
    console.log(this.pet)
  }
  
}
