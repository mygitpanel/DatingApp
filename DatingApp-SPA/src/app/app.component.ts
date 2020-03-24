import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Iuser } from './_Interfaces/Iuser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  helper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const userData: Iuser = JSON.parse(localStorage.getItem('userData'));
    if (token) {
    this.authService.decryptToken = this.helper.decodeToken(token);
    }
    if (userData) {
      this.authService.currentUser = userData;
      this.authService.ChangeMemberPhoto(userData.photoUrl);
    }
  }
}
