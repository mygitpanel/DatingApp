import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from '../_Interfaces/Imessage';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@Input() receipientId: number;
messages: IMessage[];
newMessage: any = {};

  constructor(private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decryptToken.nameid;
    this.userService.getMessageThread(this.authService.decryptToken.nameid, this.receipientId)
    .pipe(
          tap(messages => {
              for (let i = 0; i < messages.length; i++) {
                if (messages[i].isRead === false && messages[i].receipientId === currentUserId) {
                  this.userService.MarkAsRead(currentUserId, messages[i].id);
                }
              }
          })
    )
        .subscribe(messages => {
          this.messages = messages;
        }, error => {
          this.alertify.error('server error');
        });
  }

  sendMessage() {
    this.newMessage.receipientId = this.receipientId;
    this.userService.SendMessage(this.authService.decryptToken.nameid, this.newMessage).subscribe((message: IMessage) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error('server error');
    });
  }

}
