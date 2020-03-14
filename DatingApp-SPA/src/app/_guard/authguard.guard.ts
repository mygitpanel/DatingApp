import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private authservice: AuthService, private router: Router, private alertifyJs: AlertifyService) {}

  canActivate(): boolean {
    if (this.authservice.loggedIn()) {
      return true;
    }
    this.alertifyJs.error('not authorized to access');
    this.router.navigate(['/home']);
  }
}
