import { Component, OnInit, Input } from '@angular/core';
import { Iuser } from '../_Interfaces/Iuser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() usersList: Iuser;
  constructor(private router: Router) { }

  ngOnInit() {
    // console.log(this.usersList);
  }

  // userDetails(id: number) {
  //   console.log(id);
  //   this.router.navigate(['memberlist/', id]);
  // }

}
