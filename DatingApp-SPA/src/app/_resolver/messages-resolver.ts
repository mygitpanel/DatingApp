import {Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Iuser } from '../_Interfaces/Iuser';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMessage } from '../_Interfaces/Imessage';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<IMessage[]> {
    pageNumber = 1;
    pageSize = 10;
    messageContainer = 'Unread';
    // tslint:disable-next-line: max-line-length
    constructor(private router: Router, private service: UserService, private alertify: AlertifyService, private authService: AuthService) {}
    resolve(): Observable<IMessage[]> {
        return this.service.getMessages(this.authService.decryptToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/memberlist']);
                return of(null);
            })
        );
    }

}