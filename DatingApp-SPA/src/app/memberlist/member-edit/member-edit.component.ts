import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iuser } from 'src/app/_Interfaces/Iuser';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { IPhoto } from 'src/app/_Interfaces/IPhoto';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('memberEditForm') editForm: NgForm;
user: Iuser;
@HostListener('window: beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private service: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
    this.user = data['userEdit'];
    console.log(this.user);
    });
  }

  updateUser() {
    const id = this.authService.decryptToken.nameid;
    this.service.updateUsers(id, this.user).subscribe(next => {
      this.alertify.success('update successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error('Server Error');
    });
  }

  updateUserMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
