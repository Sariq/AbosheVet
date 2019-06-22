import { Injectable } from "@angular/core";
import { SessionStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class PostService {
    accessToken;
    graphUrl;
    graphQuery;
    constructor(private SessionStorage: SessionStorageService, private http: HttpClient) {}
    

    
  
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
}