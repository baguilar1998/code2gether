import { Injectable } from '@angular/core';
import { Project } from '../../models/Project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[];
  currentProject: Project;
  constructor(private http: HttpClient) {
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

    // Changes as they navigate through different projects
    this.currentProject = null;
   }


   createProject(projectInformation): Observable<any> {
     return this.http.post<any>('//localhost:3000/api/project/createProject', projectInformation);
   }
}
