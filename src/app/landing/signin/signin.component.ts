import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { Router } from '../../../../node_modules/@angular/router';
import { LoadingService } from '../../services/Loading/loading.service';

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
  constructor(private userService: UserService,
  private router: Router,
  private loadingService: LoadingService) { }

  /**
   * Functions that happens when the component
   * is loaded
   */
  ngOnInit() {
    this.username = '';
    this.password = '';
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
    this.loadingService.startLoading();
    setTimeout(() => {
      this.userService.login(this.username, this.password).subscribe(
        (data) => {
          this.userService.setUser(data);
          this.loadingService.stopLoading();
          this.router.navigate(['/projects']);
        },
        (err) => {
          this.loadingService.stopLoading();
          console.log(err);
        }
      );
    }, 1000);


  }
}
