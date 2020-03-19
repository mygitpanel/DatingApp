import { Component, OnInit } from '@angular/core';
import { Iuser } from '../_Interfaces/Iuser';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {
users: Iuser[];
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: Iuser[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }

}
