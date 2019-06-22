import { Injectable, Output, EventEmitter } from "@angular/core";
import { SessionStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserProfileService {

    constructor(private SessionStorage: SessionStorageService, private http: HttpClient) {}
    @Output() userProfileUpdated: EventEmitter<boolean> = new EventEmitter();
    

    
  
    setUserProfile(data){
        this.SessionStorage.store("UserProfile",data);
        this.userProfileUpdated.emit();
    }
  
    getUserProfile() {
        return this.SessionStorage.retrieve("UserProfile");
    }
}