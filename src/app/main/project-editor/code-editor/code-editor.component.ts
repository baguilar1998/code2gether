import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgramService } from '../../../services/Program/program.service';
import { EventEmitter } from '@angular/core';
import { ProjectService } from '../../../services/Project/project.service';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/services/User/user.service';
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit, OnDestroy {

  code: string; // holds the code that is in the current program
  @Output() codeToCompile = new EventEmitter();
  constructor(private http: HttpClient,
  private programService: ProgramService,
  private projectService: ProjectService,
  private userService: UserService,
  private socket: Socket) {
    /**
     * Gets all the available programs that are in the
     * project
     */
    this.programService.getPrograms(this.projectService.getCurrentProject()._id)
    .subscribe(
      (data) => {
        console.log('programs were loaded successfully');
        // Load the list of programs into the programs array
        this.programService.programList = data;
        // The current code that they can edit will be set to the main program
        this.code = this.programService.programList[0].code;
        // Notify all users what program a certain user is editing
        this.socket.emit('currentProgram', this.code);
      },
      (err) => {
        // Case where there was an error in getting the program
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
    // Sets the current project to null because the user has left the page
    this.projectService.setCurrentProject(null);
  }

  /**
   * Emits any changes made to the program and updates it
   * for all users that are editing the same program in
   * the project
   */
  editProgram(): void {
    this.socket.emit('editProgram', this.code);
  }

  /**
   * Compiles the program
   */
  compileProgram() {
    // Set up required information needed to compile a program
    const programInformation = {
      code: this.code,
      language: this.projectService.getCurrentProject().language,
      user: this.userService.getUser().username
    };
    // Emit that information to the compiler component because
    // that component should take care of compilation
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
