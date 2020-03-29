import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, ButtonsModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TimeagoModule } from 'ngx-timeago';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ListComponent } from './list/list.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberdetailsComponent } from './memberlist/memberDetails/memberDetails.component';
import { appRoutes } from './routes';
import { UserService } from './_services/user.service';
import { MemberDetailsResolver } from './_resolver/memberdetails-resolver';
import { MemberListResolver } from './_resolver/memberlist-resolver';
import { MemberEditComponent } from './memberlist/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/memberedit-resolver';
import { MemberEditCanDeactivateGuard } from './_guard/MemberEditCanDeactivateGuard';
import {PhotoEditorComponent} from '../app/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

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
      MemberdetailsComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      // TimeAgoPipe  not working with angular 9           // https://momentjs.com/  we can use this for time and date functionality
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      AlertModule.forRoot(),
      FileUploadModule,
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      TimeagoModule.forRoot(),
      PaginationModule.forRoot(),
      ButtonsModule.forRoot(),
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
      MemberListResolver,
      MemberEditResolver,
      MemberEditCanDeactivateGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
