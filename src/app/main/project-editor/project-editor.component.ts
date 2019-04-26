import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';
import { ProjectService } from 'src/app/services/Project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css']
})
export class ProjectEditorComponent implements OnInit {

  constructor(private userService: UserService,
    private projectService: ProjectService,
    private router: Router) {
    this.userService.autoAuthUser();
    const currentProject = JSON.parse(localStorage.getItem('currentProject'));
    this.projectService.setCurrentProject(currentProject);
    this.router.navigate([this.userService.getUser().username, currentProject.urlKey]);
   }

  ngOnInit() {
  }

}
