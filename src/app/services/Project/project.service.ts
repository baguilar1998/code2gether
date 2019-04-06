import { Injectable } from '@angular/core';
import { Project } from '../../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[];
  constructor() {
    this.projects = [
      {
        _id: '',
        owner: '',
        name: 'Project 1',
        editors: [],
        maxUsers: 8,
        language: 'Java'
      },
      {
        _id: '',
        owner: '',
        name: 'Project 2',
        editors: [],
        maxUsers: 8,
        language: 'Java'
      },
      {
        _id: '',
        owner: '',
        name: 'Project 3',
        editors: [],
        maxUsers: 8,
        language: 'C++'
      },
      {
        _id: '',
        owner: '',
        name: 'Project 4',
        editors: [],
        maxUsers: 8,
        language: 'Python'
      },
    ];
   }
}
