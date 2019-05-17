import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/User/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  /**
   * A function that logs the user out
   * It is called whenever the user clicks on logout
   * in the navbar
   */
  logout() {
    this.userService.logout();
  }

}
