import { Component, OnInit } from '@angular/core';
import { Program } from '../../../models/Program';

@Component({
  selector: 'app-program-files',
  templateUrl: './program-files.component.html',
  styleUrls: ['./program-files.component.css']
})
export class ProgramFilesComponent implements OnInit {

fileList: Program[] = [
  {
    name:'Hello.java',
    code:'sdfsdf'
  },
  {
    name:'Tristen.java',
    code:'is trash'
  },
  {
    name:'Danish.java',
    code:'is trash'
  },
  {
    name:'Project1.java',
    code:'is trash'
  },
  {
    name:'Project2.java',
    code:'is trash'
  },
  {
    name:'World.java',
    code:'sdfsdsdff'
  }
];

  constructor() { }

  ngOnInit() {
  }

}
