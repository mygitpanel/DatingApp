import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
IsRegisterVisible = false;
  constructor() { }

  ngOnInit() {
  }

  UpdateRegisterVisiblevariable() {
    console.log('updated');
    console.log(this.IsRegisterVisible);
    this.IsRegisterVisible = true;
  }

}
