import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Output() stateChange = new EventEmitter<string>();
  username: string;
  password: string;
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.form = new FormGroup({
      'username': new FormControl(this.username, {validators: [Validators.required]}),
      'password': new FormControl(this.username, {validators: [Validators.required]}),
    });
  }

  changeState(state: string): void {
    this.stateChange.emit(state);
  }

  signin(): void {
    // CODE LATER TO BE IMPLEMENTED
    console.log('Username: ' + this.form.value.username + ' Password: ' + this.form.value.password);
  }
}
