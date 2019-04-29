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
    if(!this.invitationInput) {
      console.log('you did not enter any invitation code');
    } else {
      const requiredInformation = {code: this.invitationInput, userId: this.userService.getUser()._id};
      this.projectService.joinProject(requiredInformation).subscribe(
        (res1) =>{
          console.log(res1);

          const joinInformation = {
            user: this.userService.getUser()._id,
            projectId: res1._id
          };

          this.projectService.pushToProject(joinInformation).subscribe(
            (finalRes) => {
              this.projectService.setCurrentProject(res1);
              localStorage.setItem('currentProject', JSON.stringify(this.projectService.getCurrentProject()));
              // change routing information
              this.socket.emit('joinProject', this.userService.getUser());
              this.router.navigate([this.projectService.getCurrentProject()._id]);
            },
            (finalErr) => {
              console.log(finalErr);
            }
          );

        },
        (err1) => {

        }
      );
    }

  }

}
