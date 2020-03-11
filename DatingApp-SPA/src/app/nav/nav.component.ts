import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private service: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.service.login(this.model).subscribe(next => {
      console.log('Logged In Successfully');
      this.model = {};
    }, error => {
      console.log('Failed to login');
    }
    );
  }

  LoggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // return true or false. it's a shorthand syntax of bool.
  }

  logout() {
localStorage.removeItem('token');
console.log('Log out');
  }

}
