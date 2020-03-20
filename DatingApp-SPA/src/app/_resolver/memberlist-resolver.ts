import {Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Iuser } from '../_Interfaces/Iuser';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<Iuser[]> {
    constructor(private router: Router, private service: UserService, private alertify: AlertifyService) {}
    resolve(): Observable<Iuser[]> {
        return this.service.getUsers().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/memberlist']);
                return of(null);
            })
        );
    }

}