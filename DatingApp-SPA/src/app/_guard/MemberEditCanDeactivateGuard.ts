import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../memberlist/member-edit/member-edit.component';

@Injectable()
export class MemberEditCanDeactivateGuard implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure want to continue. Any unsaved changes will be lost!');
        }
        return true;
    }
}
