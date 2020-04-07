import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthguardGuard } from './_guard/authguard.guard';
import { AuthService } from './_services/auth.service';
import { MemberdetailsComponent } from './memberlist/memberDetails/memberDetails.component';
import { MemberDetailsResolver } from './_resolver/memberdetails-resolver';
import { MemberListResolver } from './_resolver/memberlist-resolver';
import { MemberEditComponent } from './memberlist/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/memberedit-resolver';
import { MemberEditCanDeactivateGuard } from './_guard/MemberEditCanDeactivateGuard';
import { ListResolver } from './_resolver/list-resolver';
import { MessagesResolver } from './_resolver/messages-resolver';
import { AdminComponent } from './Admin/Admin.component';

export const appRoutes: Routes = [
{path: '', component: HomeComponent},
{path: '', runGuardsAndResolvers: 'always', canActivate: [AuthguardGuard], children: [
    {path: 'list', component: ListComponent, resolve: {likerusers: ListResolver}},
    {path: 'memberlist', component: MemberlistComponent, resolve: {users: MemberListResolver}},
    {path: 'memberlist/:id', component: MemberdetailsComponent, resolve: {user: MemberDetailsResolver}},
    // tslint:disable-next-line: max-line-length
    {path: 'memberedit/:edit', component: MemberEditComponent, resolve: {userEdit: MemberEditResolver}, canDeactivate: [MemberEditCanDeactivateGuard]},
    {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
    {path: 'admin', component: AdminComponent, data: {roles: ['Admin', 'Moderator']}}
]},
{path: '**', redirectTo: '', pathMatch: 'full'}];

