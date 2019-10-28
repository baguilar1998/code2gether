import { Component, OnInit } from '@angular/core';
import { Program } from '../../../models/Program';
import { ProgramService } from '../../../services/Program/program.service';

@Component({
  selector: 'app-program-files',
  templateUrl: './program-files.component.html',
  styleUrls: ['./program-files.component.css']
})
export class ProgramFilesComponent implements OnInit {

  constructor(public programService: ProgramService) { }

  ngOnInit() {}

  /**
   * Switches the code on the code editor component
   * based off of the program that the user clicked
   * @param index the program that the user clicked
   * @param event the html element that the user clicked
   */
  switchProgram(index, event) {
    console.log(event.target);
  }
}
