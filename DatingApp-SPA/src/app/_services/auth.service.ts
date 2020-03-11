import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ApiUrl = 'http://localhost:5000/api/Auth/';
  constructor(private http: HttpClient) { }

login(model: any) {
 return this.http.post(this.ApiUrl + 'login', model).pipe(
   map((response: any) => {
     const user = response;
     if (user) {
       localStorage.setItem('token', user.token);
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
)
  }
}
