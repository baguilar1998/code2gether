import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/Project/project.service';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../services/User/user.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  showDeleteModal: boolean;
  currentIndex: number;
  constructor(private projectService: ProjectService,
  private userService: UserService,
  private router: Router) {
    this.showDeleteModal = false;
    this.currentIndex = -1;
  }

  ngOnInit() {}

  displayDeleteModal(): void {
    this.showDeleteModal = !this.showDeleteModal;
  }

  gotoProject(i: number): void {
    const selectedProject = this.projectService.projects[i];
    this.router.navigate([this.userService.getUser().username, selectedProject.urlKey]);
  }

  setIndex(i: number): void {
    this.currentIndex = i;
  }

  removeProject(): void {
    this.projectService.projects.splice(this.currentIndex , 1);
    this.currentIndex = 0;
    this.displayDeleteModal();
  }
}
