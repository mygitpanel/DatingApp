import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Input() valuesFromHome: any;
@Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private service: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.service.register(this.model).subscribe(next => {
      console.log('Register Successfully');
      this.model = {};
    }, error => {
      console.log('Something went wrong');
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.model = {};
  }

}
