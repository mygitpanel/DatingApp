import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Iuser } from '../_Interfaces/Iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + 'User/';
   httpOptions = {
    headers: new HttpHeaders({
      Authorization : 'Bearer ' + localStorage.getItem('token')
    })
  };

constructor(private http: HttpClient) { }

getUsers(): Observable<Iuser[]> {
  return this.http.get<Iuser[]>(this.apiUrl + 'getusers', this.httpOptions);
 }

getSpecificUser(): Observable<Iuser> {
  return this.http.get<Iuser>(this.apiUrl + 'Getuser', this.httpOptions);
 }
}
