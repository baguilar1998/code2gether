import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/Project/project.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  showDeleteModal: boolean;
  constructor(private projectService: ProjectService) {
    this.showDeleteModal = false;
  }

  ngOnInit() {
  }

  displayDeleteModal(): void {
    console.log('this button works');
    this.showDeleteModal = !this.showDeleteModal;
  }
}
