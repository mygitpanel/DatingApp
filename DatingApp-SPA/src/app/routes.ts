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

export const appRoutes: Routes = [
{path: '', component: HomeComponent},
{path: '', runGuardsAndResolvers: 'always', canActivate: [AuthguardGuard], children: [
    {path: 'list', component: ListComponent, canActivate: [AuthguardGuard]},
    {path: 'memberlist', component: MemberlistComponent, canActivate: [AuthguardGuard], resolve: {users: MemberListResolver}},
    {path: 'memberlist/:id', component: MemberdetailsComponent, canActivate: [AuthguardGuard], resolve: {user: MemberDetailsResolver}},
    {path: 'messages', component: MessagesComponent}
]},
{path: '**', redirectTo: '', pathMatch: 'full'}];

