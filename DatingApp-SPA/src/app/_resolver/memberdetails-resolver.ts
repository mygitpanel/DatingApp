import {Injectable} from '@angular/core';
import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Iuser } from '../_Interfaces/Iuser';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailsResolver implements Resolve<Iuser> {
    constructor(private router: Router, private service: UserService, private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Iuser> {
        const id = route.params.id;
        return this.service.getSpecificUser(id).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/memberlist']);
                return of(null);
            })
        )
    }

}
