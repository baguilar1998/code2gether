import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/Project/project.service';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../services/User/user.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  showDeleteModal: boolean; // Shows whether or not the delte modal should pop up
  currentIndex: number; // the indea of the project that the user clicked on
  constructor(private projectService: ProjectService,
  private userService: UserService,
  private router: Router,
  private socket: Socket) {
    this.showDeleteModal = false;
    this.currentIndex = -1;
  }

  ngOnInit() {
    /**
     * When the user initially goes to the projects page
     * we gather all the projects that the user is currently
     * working on
     */
    this.projectService.getUserProjects(this.userService.getUser()._id).subscribe(
    (data) => {
       this.projectService.projects = data;
    },
    (err) => {
    });
  }

  /**
   * Shows/Removes the modal to deleteol
   * a project
   */
  displayDeleteModal(): void {
    this.showDeleteModal = !this.showDeleteModal;
  }

  /**
   * Takes the user to the project editor which allows them to edit
   * the current project that they are working on
   * @param i the index of the project that the user clicked
   */
  gotoProject(i: number): void {
    const selectedProject = this.projectService.projects[i];
    this.projectService.setCurrentProject(selectedProject);
    localStorage.setItem('currentProject', JSON.stringify(selectedProject));
    this.socket.emit('joinProject', this.userService.getUser());
    this.router.navigate([selectedProject.urlKey]);
  }

  /**
   * Stores the index of the project that the user clicked on
   * @param i the project index that they clicked on
   */
  setIndex(i: number): void {
    this.currentIndex = i;
  }

  /**
   * Removes the project that the user has
   * selected from the backend and from the screen
   */
  removeProject(): void {
    this.projectService.projects.splice(this.currentIndex , 1);
    this.currentIndex = 0;
    this.displayDeleteModal();
  }
}
