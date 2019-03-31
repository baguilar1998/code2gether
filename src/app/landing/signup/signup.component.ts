import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output() stateChange = new EventEmitter<string>();
  user: User;
  form: FormGroup;
  constructor(private userService: UserService,
  private router: Router) { }

  ngOnInit() {
    this.user = {
      _id: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    /**
     * Sets up the form
     */
    this.form = new FormGroup({
      'firstName': new FormControl(this.user.firstName, {validators: [Validators.required]}),
      'lastName': new FormControl(this.user.lastName, {validators: [Validators.required]}),
      'username': new FormControl(this.user.username, {validators: [Validators.required]}),
      'email': new FormControl(this.user.email, {validators: [Validators.required]}),
      'password': new FormControl(this.user.password, {validators: [Validators.required]})
    });
  }


  /**
   * Changes components based off user clicks
   * @param state the next component state to go to
   */
  changeState(state: string): void {
    this.stateChange.emit(state);
  }

  signup(): void {
    /**
     * Get all the user information
     * from the form
     */
    this.user = {
      _id: '',
      username: this.form.value.username,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password
    };

    /**
     * Send the user information to the backend
     * and sign the user up
     */
    this.userService.signUp(this.user).subscribe(
      (user) => {
        this.userService.setUser(user);
        this.router.navigate(['/projects']);
      },
      (err) => {

      }
    );
  }
}
