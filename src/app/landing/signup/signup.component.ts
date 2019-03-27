import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output() stateChange = new EventEmitter<string>();
  user: User;
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.user = {
      _id: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.form = new FormGroup({
      'firstName': new FormControl(this.user.firstName, {validators: [Validators.required]}),
      'lastName': new FormControl(this.user.lastName, {validators: [Validators.required]}),
      'username': new FormControl(this.user.username, {validators: [Validators.required]}),
      'email': new FormControl(this.user.email, {validators: [Validators.required]}),
      'password': new FormControl(this.user.password, {validators: [Validators.required]})
    });
  }

  changeState(state: string): void {
    this.stateChange.emit(state);
  }

  signup(): void {
    // CODE TO BE LATER IMPLEMENTED
    this.user = {
      _id: '',
      username: this.form.value.username,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password
    };
    console.log(this.user);
  }
}
