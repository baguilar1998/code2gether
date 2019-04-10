import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgramService } from '../../../services/Program/program.service';
import { EventEmitter } from '@angular/core';
import { ProjectService } from '../../../services/Project/project.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  code: string;
  @Output() codeToCompile = new EventEmitter();
  constructor(private http: HttpClient,
  private programService: ProgramService,
  private projectService: ProjectService) {
    this.code = this.programService.programList[0].code;
   }

  ngOnInit() {
  }

  testCompile() {
    const program = {
      language: 'Python',
      code: this.code
    };
    this.codeToCompile.emit(program);

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
