import { Injectable } from "@angular/core";
import { SessionStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
    //serverPath="http://localhost:60433";
    serverPath="http://ec2-3-17-56-103.us-east-2.compute.amazonaws.com";
    constructor(private SessionStorage: SessionStorageService, private http: HttpClient) {}
    
    registerUser(userFbData){
        let userData={
            ID:userFbData.userID,
            Name:userFbData.Name,
            ImageUrl:userFbData.ImageUrl,
            Email:userFbData.Email
        }
         this.http.post(this.serverPath+"/api/Client/Register",userData).subscribe((res) => {
            console.log(res);
          });;
    }

    getClient(userFbData){
        if(!userFbData){
         userFbData={
            userId:"10156447597321166"
        }
    }else{
        userFbData={
            userId:userFbData
        }
    }
        return  this.http.post(this.serverPath+"/api/Client/GetClinetById",userFbData);
    }
    
  
    
  
   
}