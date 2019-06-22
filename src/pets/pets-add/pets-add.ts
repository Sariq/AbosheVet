import { PetsItem } from './../pets-item/pets-item';
import { PetsList } from './../pets-list/pets-list';
import { UserProfileService } from './../../common/services/user-profile.service';
import { Component, ViewChild, ElementRef, Renderer, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PetsService } from '../pets-service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth-service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'pets-add',
  templateUrl: './pets-add.html'
})
export class PetsAdd implements OnInit{
  @ViewChild('fileInput') fileInput:ElementRef;
  private uploader: FileUploader;
  private title: string;

  petData={};
  constructor(public navCtrl: NavController,private petsService:PetsService,private renderer:Renderer,private userProfileService:UserProfileService,private authService:AuthService,private cloudinary: Cloudinary) {
  }
  ngOnInit(){
    // Create the file uploader, wire it to upload to your account
    const options: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: false,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(options);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `myphotoalbum,${this.title}`;
      }
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'angular_sample');
      // Add custom tags
      form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>{
      console.log(response)
      response = JSON.parse(response);
      this.petForm.controls["imageUrl"].patchValue(response["secure_url"]);
      this.petsService.onAddPet(this.petForm.value).subscribe(data=>{
        let userProfile=this.userProfileService.getUserProfile();
        let userId=userProfile.UserName;
        this.authService.getClient(userId).subscribe((res) => {
          this.userProfileService.setUserProfile(res);
          let pet=res["PetsList"][res["PetsList"].length-1];
          this.petsService.setSelectedPet(pet);
          this.navCtrl.push(PetsItem)
        });
      });
    }
   
    




  }

  updateTitle(value: string) {
    this.title = value;
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: data.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  
  

  petForm = new FormGroup({
    name: new FormControl('',Validators.required),
    descent: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    color: new FormControl('',Validators.required),
    dateOfBirth: new FormControl('',Validators.required),
    castratedType: new FormControl('',Validators.required),
    chipNumber: new FormControl('',Validators.required),
    imageUrl: new FormControl('')
  });
  fileToUpload;
  showImageBrowseDlg() {
    let event = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(
        this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }
  
  url;
  handleFileInput(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload = event.target.files.item(0);
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  onAddPet(){
    this.uploader.uploadAll();

    console.log(this.petData);
  }
}

