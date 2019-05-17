/**
 * Program service that holds all data that is needed
 * such as a program list for whenever a user is in the project
 * editor and all possible backend calls that can be made
 */
import { Injectable } from '@angular/core';
import { Program } from '../../models/Program';
import { ProjectService } from '../Project/project.service';
import { Observable } from '../../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  public programList: Program[];
  constructor(private projectService: ProjectService,
  private http: HttpClient) {
    this.programList = [];
  }

  /**
   * Adds a program to the database
   * @param programName the name of the program that you want to add
   * @result this only takes care of adding the main program
   * due to time contraints other programs cannot be added
   */
  addProgram(programName: string): Observable<any> {
    // Set up necessary information needed for a program
    const program = {
      projectId: this.projectService.getCurrentProject()._id,
      name: programName,
      code: ''
    };

    // Determine what language the program is in and send that program
    // to the proper backend route
    switch (this.projectService.getCurrentProject().language) {
      case 'Java':
        program.code = 'public class Main{\n' +
                          ' \tpublic static void main(String [] args){\n' +
                              '\t\t\n' +
                            '\t\n}' +
                          '}';
        program.name += '.java';
        break;
      case 'C++':
        program.code = '#include <iostream>\n' +
                        'using namespace std;\n\n' +
                        'int main(){ \n' +
                          '\t return 0; \n' +
                        '}';
        program.name += '.cpp';
        break;
      case 'C':
        program.code = '#include <stdio.h>\n' +
                        'int main(){\n' +
                          '\t return 0; \n' +
                        '}';
        program.name += '.c';
        break;
        case 'Python':
          program.name += '.py';
          break;
        case 'Javascript':
          program.name += '.js';
          break;
    }

    return this.http.post<any>('//localhost:3000/api/project/addProgram', program);
  }

  getPrograms(projectId: string): Observable<any> {
    const requiredInformation = { projectId: projectId };
    return this.http.post<any>('//localhost:3000/api/project/getPrograms', requiredInformation);
  }
}
