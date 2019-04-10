import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/User/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showModal: boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.showModal = false;
    this.userService.autoAuthUser();
  }

  /**
   * Shows the project modal or not
   * depending on user clicks
   */
  showProjectModal(): void {
    this.showModal = !this.showModal;
  }

}
