import { Injectable } from '@angular/core';
import { Program } from '../../models/Program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  public programList: Program[];
  constructor() {
    this.programList = [
      {
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
    ];
  }
}
