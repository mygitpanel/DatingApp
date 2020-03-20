import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ListComponent } from './list/list.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { MessagesComponent } from './messages/messages.component';
import {MemberCardComponent} from './member-card/member-card.component';
import {MemberdetailsComponent} from './memberlist/memberDetails/memberDetails.component';
import { appRoutes } from './routes';
import { UserService } from './_services/user.service';
import { MemberDetailsResolver } from './_resolver/memberdetails-resolver';
import { MemberListResolver } from './_resolver/memberlist-resolver';

export function tokenGetter() {   // https://github.com/auth0/angular2-jwt    [Get this code from here]
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListComponent,
      MemberlistComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberdetailsComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      // tslint:disable-next-line: max-line-length
      NgxGalleryModule, // for ngx-gallery i angular 9 use this link https://github.com/kolkov/ngx-gallery. there are different ways for angular 8+ and before 8 version.
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      UserService,
      ErrorInterceptorProvider,
      MemberDetailsResolver,
      MemberListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
