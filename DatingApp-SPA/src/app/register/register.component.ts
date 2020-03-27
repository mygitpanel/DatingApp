import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Input() valuesFromHome: any;
@Output() cancelRegister = new EventEmitter();
  model: any = {};
registerForm: FormGroup;

  constructor(private service: AuthService, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  CreateRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    // tslint:disable-next-line: object-literal-key-quotes
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    console.log(this.registerForm.value);
    // this.service.register(this.model).subscribe(next => {
    //   this.alertify.success('Register Successfully');
    //   this.model = {};
    // }, error => {
    //   this.alertify.error('Something went wrong');
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.model = {};
  }

}
