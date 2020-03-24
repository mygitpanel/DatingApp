import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPhoto } from '../_Interfaces/IPhoto';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: IPhoto[];
  @Output() userMainphoto = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  response: string;
  baseUrl = environment.apiUrl;
  curretnMainphoto: IPhoto;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

    fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/' + this.authService.decryptToken.nameid + '/photo',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
  });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: IPhoto = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
}

setMainPhoto(photo: IPhoto) {
const userId = this.authService.decryptToken.nameid;
this.userService.setMainPhoto(userId, photo.id).subscribe(next => {
  this.alertify.success('Main photo Updated');
  this.curretnMainphoto =  this.photos.filter(p => p.isMain === true)[0];
  this.curretnMainphoto.isMain = false;
  photo.isMain = true;
  // this.userMainphoto.emit(photo.url);    //  Emit to Member edit component and get PhotoURL to update main photo on html;
  this.authService.ChangeMemberPhoto(photo.url);
  this.authService.currentUser.photoUrl = photo.url;
  localStorage.setItem('userData', JSON.stringify(this.authService.currentUser));
}, error => {
  this.alertify.error('Problem with the services');
});
}
}

