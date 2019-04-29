import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgramService } from '../../../services/Program/program.service';
import { EventEmitter } from '@angular/core';
import { ProjectService } from '../../../services/Project/project.service';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit, OnDestroy {

  code: string;
  @Output() codeToCompile = new EventEmitter();
  constructor(private http: HttpClient,
  private programService: ProgramService,
  private projectService: ProjectService,
  private socket: Socket) {
    this.programService.getPrograms(this.projectService.getCurrentProject()._id)
    .subscribe(
      (data) => {
        console.log('programs were loaded successfully');
        this.programService.programList = data;
        this.code = this.programService.programList[0].code;
        this.socket.emit('currentProgram', this.code);
      },
      (err) => {
        console.log('there was an error in loading the programs');
      }
    );

    this.socket.on('currentProgram', (program) => {
      console.log(program);
    });

    this.socket.on('editProgram', (program) => {
      console.log('Changes have been made to the program');
      console.log(program);
      this.code = program;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.projectService.setCurrentProject(null);
  }

  editProgram(): void {
    this.socket.emit('editProgram', this.code);
  }

  compileProgram() {
    const programInformation = {
      code: this.code,
      language: this.projectService.getCurrentProject().language
    };
    this.codeToCompile.emit(programInformation);
  }

  /**
   * Allows us to manipulate textarea for tab events
   * @param event key that user pressed on
   */
  keyBindings(event) {
    const textarea = (document.getElementById('inputClass') as HTMLTextAreaElement);
    if (event.keyCode === 9) { // tab was pressed
        const newCaretPosition = textarea.selectionStart + '    '.length;
        textarea.value = textarea.value.substring(0, textarea.selectionStart) + '    '
        + textarea.value.substring(textarea.selectionStart, textarea.value.length);
        textarea.selectionStart = newCaretPosition;
        textarea.selectionEnd = newCaretPosition;
        textarea.focus();
        return false;
    }
    if (event.keyCode === 8) { // backspace
        if (textarea.value.substring(textarea.selectionStart - 4, textarea.selectionStart) === '    ') { // it's a tab space
            const newCaretPosition = textarea.selectionStart - 3;
            textarea.value = textarea.value.substring(0, textarea.selectionStart - 3)
            + textarea.value.substring(textarea.selectionStart, textarea.value.length);
            textarea.selectionStart = newCaretPosition;
            textarea.selectionEnd = newCaretPosition;
        }
    }
   if (event.keyCode === 37) { // left arrow
        if (textarea.value.substring(textarea.selectionStart - 4, textarea.selectionStart) === '    ') { // it's a tab space
            const newCaretPosition = textarea.selectionStart - 3;
            textarea.selectionStart = newCaretPosition;
            textarea.selectionEnd = newCaretPosition;
        }
    }
    if (event.keyCode === 39) { // right arrow
        if (textarea.value.substring(textarea.selectionStart + 4, textarea.selectionStart) === '    ') { // it's a tab space
            const newCaretPosition = textarea.selectionStart + 3;
            textarea.selectionStart = newCaretPosition;
            textarea.selectionEnd = newCaretPosition;
        }
    }
  }
}
