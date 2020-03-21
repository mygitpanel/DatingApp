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

constructor(private http: HttpClient) { }

getUsers(): Observable<Iuser[]> {
  return this.http.get<Iuser[]>(this.apiUrl + 'getusers');
 }

getSpecificUser(id: number): Observable<Iuser> {
  return this.http.get<Iuser>(this.apiUrl + 'getuser/' + id);
 }

 updateUsers(id: number, user: Iuser) {
return this.http.put(this.apiUrl + 'updateUser/' + id, user);
 }
}
