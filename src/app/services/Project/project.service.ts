/**
 * A project services that holds all necessary project information
 * that is needed for the website as well as all possible backend
 * calls that can be used for any project
 */
import { Injectable } from '@angular/core';
import { Project } from '../../models/Project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[];
  currentProject: Project;
  constructor(private http: HttpClient) {
    this.projects = []; // holds the list of projects that the user currently has

    // Changes as they navigate through different projects
    this.currentProject = null;
   }


   // Backend call for creating a project
   createProject(projectInformation): Observable<any> {
     return this.http.post<any>('http://code2getherbackend-env.zmbc6ifmpq.us-east-2.elasticbeanstalk.com/api/project/createProject', projectInformation);
   }

   // Backend call for joining a project
   joinProject(invitationInformation): Observable<any> {
     return this.http.post<any>('http://code2getherbackend-env.zmbc6ifmpq.us-east-2.elasticbeanstalk.com/api/project/joinProject', invitationInformation);
   }

   // Backend call to push a project
   pushToProject(requiredInformation): Observable<any> {
     return this.http.post<any>('http://code2getherbackend-env.zmbc6ifmpq.us-east-2.elasticbeanstalk.com/api/project/pushToProject', requiredInformation);
   }

   // Backend call to get all user projects
   getUserProjects(userId: string) {
     const requiredInformation = {userId: userId};
     return this.http.post<any>('http://code2getherbackend-env.zmbc6ifmpq.us-east-2.elasticbeanstalk.com/api/project/getProjects', requiredInformation);
   }

   /**
    * Getters and setters methods below
    */

   setCurrentProject(project: Project): void {
     this.currentProject = project;
   }

   getCurrentProject(): Project {
     return this.currentProject;
   }
}
