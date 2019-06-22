import { Component, HostListener } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from '../post-service';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.html'
})
export class PostList {
  screenWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    
    this.screenWidth = window.innerWidth;
    
}
  constructor(public navCtrl: NavController,private postService:PostService) {
    this.screenWidth = window.innerWidth;
  }
  ngOnInit(){
    this.screenWidth = window.innerWidth;
  }
}
