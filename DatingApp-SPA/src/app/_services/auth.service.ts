import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Iuser } from '../_Interfaces/Iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ApiUrl = environment.apiUrl + 'Auth/';
  decryptToken: any;
  currentUser: Iuser;

  helper = new JwtHelperService();
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  ChangeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

login(model: any) {
 return this.http.post(this.ApiUrl + 'login', model).pipe(
   map((response: any) => {
     const user = response;
     if (user) {
       localStorage.setItem('token', user.token);
       localStorage.setItem('userData', JSON.stringify(user.userData));
       this.decryptToken = this.helper.decodeToken(user.token);
       this.currentUser = user.userData;
       this.ChangeMemberPhoto(this.currentUser.photoUrl);
     }
   })
   );
  }

  register(user: Iuser) {
return this.http.post(this.ApiUrl + 'register', user, {
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

  isRoleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decryptToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)){
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}
