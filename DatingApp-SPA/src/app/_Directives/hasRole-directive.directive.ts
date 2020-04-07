import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
@Input() appHasRole: string[];
isVisible = false;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private authService: AuthService) { }

  ngOnInit() {
    const userRoles = this.authService.decryptToken.role as Array<string>;

    if (!userRoles) {
      this.viewContainerRef.clear();
    }
    console.log(this.appHasRole);
    if (this.authService.isRoleMatch(this.appHasRole)) {
        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
    }
  }

}
