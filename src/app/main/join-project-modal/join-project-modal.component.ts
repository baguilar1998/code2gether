import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/Project/project.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-join-project-modal',
  templateUrl: './join-project-modal.component.html',
  styleUrls: ['./join-project-modal.component.css']
})
export class JoinProjectModalComponent implements OnInit {

  invitationInput: string;
  constructor(private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
    private socket: Socket) { }

  ngOnInit() {
  }

  /**
   * Allows the user to join any project that
   * any other users are currently working on
   */
  joinRoom(): void {
    // Checks if the user inputted any inviation code
    if (!this.invitationInput) {
      console.log('you did not enter any invitation code');
    } else {
      // Sets up the required information needed in order for a user to join a project
      const requiredInformation = {code: this.invitationInput, userId: this.userService.getUser()._id};
      // Send information to backend so the user can join the project
      this.projectService.joinProject(requiredInformation).subscribe(
        (res1) => {

          // Sets up the information to add the user to the editors array for a project
          const joinInformation = {
            user: this.userService.getUser()._id,
            projectId: res1._id
          };

          // Sends that information to the backend to update the project
          this.projectService.pushToProject(joinInformation).subscribe(
            (finalRes) => {
              this.projectService.setCurrentProject(res1); // sets their current project to the project that they are joining
              // Adds the proejct to the local storage (for page refresh)
              localStorage.setItem('currentProject', JSON.stringify(this.projectService.getCurrentProject()));
              // Emit the user information to notify all users taht a new user joined the project
              this.socket.emit('joinProject', this.userService.getUser());
              // Naviage to the project editor page
              this.router.navigate([this.projectService.getCurrentProject()._id]);
            },
            (finalErr) => {
              // Case where the user wasn't pushed to the editors array
              console.log(finalErr);
            }
          );

        },
        (err1) => {
          // Case where there was an error in the user jonining the project
          console.log('Cant join project');
        }
      );
    }

  }

}
