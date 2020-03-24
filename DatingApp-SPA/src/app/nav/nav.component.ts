import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;
  constructor(public service: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.service.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.service.login(this.model).subscribe(next => {
      this.alertify.success('Logged In Successfully');
      this.model = {};
    }, error => {
      this.alertify.error('Failed to login');
    }, () => {
    this.router.navigate(['/memberlist']);
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
localStorage.removeItem('userData');
this.router.navigate(['/home']);
this.alertify.message('Log out');
  }

}
