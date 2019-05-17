import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/User/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  projectModal: boolean; // Controls whether or not the create project modal should show
  joinModal: boolean; // Controls whether or not the join project modal should show
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.projectModal = false;
    this.joinModal = false;
    this.userService.autoAuthUser();
    localStorage.removeItem('currentProject');
  }

  /**
   * Shows the project modal or not
   * depending on user clicks
   */
  showProjectModal(): void {
    this.projectModal = !this.projectModal;
  }

    /**
   * Shows the join a project modal or not
   * depending on user clicks
   */
  showJoinModal(): void {
    this.joinModal = !this.joinModal;
  }

}
