import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ApiUrl = environment.apiUrl + 'Auth/';
  decryptToken: any;
  helper = new JwtHelperService();
  constructor(private http: HttpClient) { }

login(model: any) {
 return this.http.post(this.ApiUrl + 'login', model).pipe(
   map((response: any) => {
     const user = response;
     if (user) {
       localStorage.setItem('token', user.token);
       this.decryptToken = this.helper.decodeToken(user.token);
     }
   })
   );
  }

  register(model: any) {
return this.http.post(this.ApiUrl + 'register', model, {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}).pipe(
  map((response: any) => {
    if (response) {
console.log(response);
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
    return !this.helper.isTokenExpired(token);
    }
  }
}
