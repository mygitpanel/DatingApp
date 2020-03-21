import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Iuser } from '../_Interfaces/Iuser';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<Iuser> {
    // tslint:disable-next-line: max-line-length
    constructor(private service: UserService, private alertify: AlertifyService, private router: Router, private authService: AuthService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Iuser> {
        const id = this.authService.decryptToken.nameid;
        return this.service.getSpecificUser(id).pipe(
            catchError((error) => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/memberlist']);
                return of(null);
            })
        );
    }

}