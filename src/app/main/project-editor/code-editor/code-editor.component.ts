import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  code: string;
  constructor(private http: HttpClient) {
    this.code = '';
   }

  ngOnInit() {
  }

  testCompile() {
    console.log('button works');
    this.http.post<any>('//localhost:3000/api/compiler/java', {code: this.code})
    .subscribe((data) => {

    });
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
