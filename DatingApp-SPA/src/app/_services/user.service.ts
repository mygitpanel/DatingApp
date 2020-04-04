import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Iuser } from '../_Interfaces/Iuser';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PaginatedResult } from '../_Interfaces/IPagination';
import { map } from 'rxjs/operators';
import { IMessage } from '../_Interfaces/Imessage';
import { JsonPipe } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + 'User/';

constructor(private http: HttpClient, private service: AuthService) { }

getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<Iuser[]>> {

  const paginatedResult: PaginatedResult<Iuser[]> = new PaginatedResult<Iuser[]>(); // PaginatedResult from IPagination

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  if (likesParam === 'Likers'){
    params = params.append('likers', 'true');
  }

  if (likesParam === 'Likees'){
    params = params.append('likees', 'true');
  }

  return this.http.get<Iuser[]>(this.apiUrl + 'getusers', {observe: 'response', params}).pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
 }

getSpecificUser(id: number): Observable<Iuser> {
  return this.http.get<Iuser>(this.apiUrl + 'getuser/' + id);
 }

 updateUsers(id: number, user: Iuser) {
return this.http.put(this.apiUrl + 'updateUser/' + id, user);
 }

 setMainPhoto(userId: number, photoId: number) {
   return this.http.post(this.apiUrl + userId + '/photo/' + photoId + '/setMainPhoto', {});
 }

 DeletePhoto(userId: number, photoId: number) {
  return this.http.delete(this.apiUrl + userId + '/photo/' + photoId);
 }

 sendLike(userId: number, receipientId: number ) {
  return this.http.post(this.apiUrl + userId + '/like/' + receipientId, {});
 }

 getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
   const paginatedResult: PaginatedResult<IMessage[]> = new PaginatedResult<IMessage[]>();

   let params = new HttpParams();
   params = params.append('MessageContainer', messageContainer);

   if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

   return this.http.get<IMessage[]>(this.apiUrl + id + '/messages' + '/getmessagelist', {observe: 'response', params}).pipe(
            map(response => {
              paginatedResult.result = response.body;
              if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
              }
              return paginatedResult;
            })
      );
 }

 getMessageThread(userId: number, receipientId: number) {
  return this.http.get<IMessage[]>(this.apiUrl + userId + '/messages/thread/' + receipientId);
 }

 SendMessage(userId: number, message: Message) {
  return this.http.post(this.apiUrl + userId + '/messages/createmessage', message);
 }

 deleteMessage(id: number, userId: number) {
  return this.http.post(this.apiUrl + userId + '/messages/deletemessage/' + id, {});
 }


}
