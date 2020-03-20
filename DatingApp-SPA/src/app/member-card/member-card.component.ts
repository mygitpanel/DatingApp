import { Component, OnInit, Input } from '@angular/core';
import { Iuser } from '../_Interfaces/Iuser';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() usersList: Iuser;
  constructor() { }

  ngOnInit() {
    // console.log(this.usersList);
  }

}
