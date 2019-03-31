import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Output() stateChange = new EventEmitter<string>();
  isLoading: boolean; // displays the loading component
  username: string; // username that user typed in
  password: string; // password that user typed in
  form: FormGroup; // stores user and password value in a form
  constructor(private userService: UserService,
  private router: Router) { }

  /**
   * Functions that happens when the component
   * is loaded
   */
  ngOnInit() {
    this.username = '';
    this.password = '';
    this.isLoading = false;
    this.form = new FormGroup({
      'username': new FormControl(this.username, {validators: [Validators.required]}),
      'password': new FormControl(this.password, {validators: [Validators.required]}),
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

    this.username = this.form.value.username;
    this.password = this.form.value.password;
    setTimeout(() => {
      this.isLoading = true;
      console.log(this.isLoading);
      this.userService.login(this.username, this.password).subscribe(
        (data) => {
          this.userService.setUser(data);
          this.isLoading = false;
          this.router.navigate(['/projects']);
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
      );
    }, 1000);


  }
}
