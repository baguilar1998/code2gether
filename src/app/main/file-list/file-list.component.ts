import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/Project/project.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  showDeleteModal: boolean;
  currentIndex: number;
  constructor(private projectService: ProjectService) {
    this.showDeleteModal = false;
    this.currentIndex = -1;
  }

  ngOnInit() {}

  displayDeleteModal(): void {
    this.showDeleteModal = !this.showDeleteModal;
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
