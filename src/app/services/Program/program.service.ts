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

  addProgram(programName: string): Observable<any> {
    const program = {
      projectId: this.projectService.getCurrentProject()._id,
      name: programName,
      code: ''
    };

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

/**TEST DATA
 *       {
        name: 'Hello.java',
        code: 'sdfsdf'
      },
      {
        name: 'Tristen.java',
        code: 'is trash'
      },
      {
        name: 'Danish.java',
        code: 'is trash'
      },
      {
        name: 'Project1.java',
        code: 'is trash'
      },
      {
        name: 'Project2.java',
        code: 'is trash'
      },
      {
        name: 'World.java',
        code: 'sdfsdsdff'
      }
 */
