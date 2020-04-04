import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Iuser } from 'src/app/_Interfaces/Iuser';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';  // NGX gallery references
import {NgxGalleryImage} from '@kolkov/ngx-gallery';  // NGX gallery references
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';  // NGX gallery references
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];  // NGX gallery code
  galleryImages: NgxGalleryImage[];   // NGX gallery code
user: Iuser;

@ViewChild('memberTabs') memberTabs: TabsetComponent

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private service: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
//  NGX Gallery code starts here-----
    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

    
    getImages() {
      const imageUrls = [];
  for(const photo of this.user.photo) {
    imageUrls.push({
      small: photo.url,
      medium:  photo.url,
      big: photo.url,
      description:  photo.description
    })
  }
  return imageUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  // loadUser() {
  //   const id = +this.route.snapshot.params['id'];
  //   this.service.getSpecificUser(id).subscribe((user: Iuser) => {
  //     this.user = user;
  //     console.log(this.user);
  //   }, error => {
  //     this.alertify.error(error);
  //   })
  // }

}
