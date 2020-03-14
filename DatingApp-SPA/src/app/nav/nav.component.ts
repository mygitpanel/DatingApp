import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(public service: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.service.login(this.model).subscribe(next => {
      this.alertify.success('Logged In Successfully');
      this.model = {};
    }, error => {
      this.alertify.error('Failed to login');
    }
    );
  }

  LoggedIn() {
    return this.service.loggedIn();  // function called on HTML to show user name and othe rthings
    // const token = localStorage.getItem('token');
    // return !!token; // return true or false. it's a shorthand syntax of bool.
  }

  logout() {
localStorage.removeItem('token');
this.alertify.message('Log out');
  }

}
