import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Output() stateChange = new EventEmitter<string>();
  username: string; // username that user typed in
  password: string; // password that user typed in
  form: FormGroup; // stores user and password value in a form
  constructor() { }

  /**
   * Functions that happens when the component
   * is loaded
   */
  ngOnInit() {
    this.username = '';
    this.password = '';
    this.form = new FormGroup({
      'username': new FormControl(this.username, {validators: [Validators.required]}),
      'password': new FormControl(this.username, {validators: [Validators.required]}),
    });
  }

  /**
   * Goes back to the home component
   * @param state the next state the user goes to
   */
  changeState(state: string): void {
    this.stateChange.emit(state);
  }

  /**
   * Signs the user into the site which
   * will redirect them into the main page
   */
  signin(): void {
    // CODE LATER TO BE IMPLEMENTED
    console.log('Username: ' + this.form.value.username + ' Password: ' + this.form.value.password);
  }
}
