import { PetsList } from './pets-list/pets-list';
import { Injectable } from "@angular/core";
import { SessionStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { UserProfileService } from "../common/services/user-profile.service";

@Injectable()
export class PetsService {
    //serverPath="http://localhost:60433";
    serverPath="http://ec2-3-17-56-103.us-east-2.compute.amazonaws.com";
    accessToken;
    graphUrl;
    graphQuery;
    constructor(private SessionStorage: SessionStorageService, private http: HttpClient,private userProfileService:UserProfileService) {}
    

    
  
    getAccessToken(){

        let accessTokenUrl=this.graphUrl+'287670022054239?fields=access_token'
        return this.http
          .get(accessTokenUrl).subscribe(res=>console.log(res))
    }
  
    getPosts() {
        let userFbData=this.SessionStorage.retrieve('userFbData');
        this.accessToken = userFbData.accessToken;
        this.graphUrl = 'https://graph.facebook.com/';
        this.graphQuery = '?access_token='+this.accessToken+'n&date_format=U&fields=posts{from,created_time,message,attachments}';
   
        let pageName='287670022054239'
      let url = this.graphUrl + pageName + this.graphQuery;
  
      return this.http
          .get(url);
         
     }

     addVaccination(type, pet){
        //  if(this.getVaccinationNextDateByType(pet.VaccinationList, type)){

        //  }
        let date;
        switch(type){
             case 1:
             case 3:
                date=new Date(new Date().setMonth(new Date().getMonth() + 1));
                date.setHours(10);
                date.setMinutes(0);
                date.setMilliseconds(0);
                break;
             case 2:
             case 5:
                date=new Date(new Date().setFullYear(new Date().getFullYear() + 1));
                date.setHours(10);
                date.setMinutes(0);
                date.setMilliseconds(0);
                break;
             case 4:
                date=new Date(new Date().setMonth(new Date().getMonth() + 6));
                date.setHours(10);
                date.setMinutes(0);
                date.setMilliseconds(0);
                break;
        }
        let userProfile=this.userProfileService.getUserProfile();
        let index = pet.VaccinationList.findIndex(x => x.Type==type);
        let vaccination = {
            nextDate:date.getTime(),
            userId:userProfile.UserName || userProfile.userID,
            petId:pet._id,
            Type:type,
            index : index < 0 ? pet.VaccinationList.length : index
        }
        console.log(index);
        return  this.http.post(this.serverPath+"/api/Client/UpdateVaccination",vaccination);
     }

     onAddPet(pet){
        let userProfile=this.userProfileService.getUserProfile();
        pet.userId=userProfile.UserName || userProfile.userID;
        return  this.http.post(this.serverPath+"/api/Client/AddPet",pet);
     }
     
    setSelectedPet(data){
        this.SessionStorage.store("SelectedPet",data);
    }
  
    getSelectedPet() {
        return this.SessionStorage.retrieve("SelectedPet");
    }
    
    getVaccinationNextDateByType(vaccinationList, type){
         let result = vaccinationList.filter(vaccination => vaccination.Type === type)[0];
         
         return result ? result.nextDate : null;
    }

    getPetById(id){
        let userProfile=this.userProfileService.getUserProfile();
        
        let result = userProfile.PetsList.filter(pet => pet._id === id)[0];
        return result;
    }
}