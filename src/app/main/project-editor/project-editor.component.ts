import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';
import { ProjectService } from 'src/app/services/Project/project.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css']
})
export class ProjectEditorComponent implements OnInit {

  constructor(private userService: UserService,
    private projectService: ProjectService,
    private router: Router,
    private socket: Socket) {
    this.userService.autoAuthUser();
    const currentProject = JSON.parse(localStorage.getItem('currentProject'));
    this.projectService.setCurrentProject(currentProject);
    this.router.navigate([this.projectService.getCurrentProject().urlKey]);
   }

  ngOnInit() {
    this.socket.on('joinProject', (user) =>{
      console.log(user);
    });
  }

}
