import { Component, OnInit, Input } from '@angular/core';
import { Iuser } from '../_Interfaces/Iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() usersList: Iuser;
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {

  }

  sendLike(id: number) {
    const userId = this.authService.decryptToken.nameid;
    this.userService.sendLike(userId, id).subscribe(data => {
      this.alertify.success('You have likes: ' + this.usersList.knownAs);
    }, error => {
      this.alertify.error('already liked');
    });
  }

  // userDetails(id: number) {
  //   console.log(id);
  //   this.router.navigate(['memberlist/', id]);
  // }

}
