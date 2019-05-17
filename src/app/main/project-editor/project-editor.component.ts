import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';
import { ProjectService } from 'src/app/services/Project/project.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css']
})
export class ProjectEditorComponent implements OnInit {

  currentUsers: User[];
  constructor(private userService: UserService,
    private projectService: ProjectService,
    private router: Router,
    private socket: Socket) {
    this.currentUsers = [];
    /**
     * Load up necessary information if the user
     * refreshes the page such as the current project their
     * editing and their user information
     */
    this.userService.autoAuthUser();
    const currentProject = JSON.parse(localStorage.getItem('currentProject'));
    this.projectService.setCurrentProject(currentProject);
    this.router.navigate([this.projectService.getCurrentProject().urlKey]);
   }

  ngOnInit() {
    /**
     * Emits the user that joined the project
     */
    this.socket.on('joinProject', (user) => {
      this.currentUsers.push(user);
      console.log(this.currentUsers);
    });
  }

}
