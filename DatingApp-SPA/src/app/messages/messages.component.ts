import { Component, OnInit } from '@angular/core';
import { IMessage } from '../_Interfaces/Imessage';
import { IPagination, PaginatedResult } from '../_Interfaces/IPagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages: IMessage[];
pagination: IPagination;
messageContainer = 'Unread';

  // tslint:disable-next-line: max-line-length
  constructor(private userService: UserService, private authService: AuthService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decryptToken.nameid, this.pagination.currentPage,
             this.pagination.itemsPerPage, this.messageContainer)
             .subscribe((res: PaginatedResult<IMessage[]>) => {
               this.messages = res.result;
               this.pagination = res.pagination;
             }, error => {
               this.alertify.error('server error');
             });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
