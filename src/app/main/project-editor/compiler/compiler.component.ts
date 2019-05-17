import { Component, OnInit } from '@angular/core';
import { CompilerService } from '../../../services/Compiler/compiler.service';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.css']
})
export class CompilerComponent implements OnInit {

  constructor(private compilerService: CompilerService,
    private socket: Socket) { }

  ngOnInit() {
    /**
     * Listens to any emits and it displays the output
     * of the code to the screen
     */
    this.socket.on('compiledCode', (output) => {
      console.log('Your output is: ' + output);
      const compilerEditor = document.getElementById('compiler');
      compilerEditor.innerHTML += '<span style="color:white; margin-left:10px;">' + output + '</span><br/>';
    });

    /**
     * Listens to any emits and displays the user
     * that decided to compile the code
     */
    this.socket.on('compiling', (user) => {
      const compilerEditor = document.getElementById('compiler');
      compilerEditor.innerHTML += '<span style="color:white; margin-left:10px;">' + user
      + '  is compiling current state of code... </span><br/>';
    });
  }

  /**
   * Sends the current state of the code to the backend to be compiled
   * and displays the output
   * @param program the current code that the user is going to compile
   */
  compile(program): void {
    // Send to all users who is compiling the code
    this.socket.emit('compiling', program.user);

    /**
     * Determine which programming langauge to compile
     * based on the type of language that they used for the
     * project
     *
     * For every code that gets compiled successfully in the backend
     * (including errors), will be emitted to all users with the
     * emit()
     */
    switch (program.language) {
      // Sends Java code to the Java compiler
      case 'Java':
        this.compilerService.compileJavaCode(program.code).subscribe(
          (compiledCode) => {
            this.socket.emit('compiledCode', compiledCode.stdout);
          }
        );
        break;

        // Sends C++ code the GNU compiler
        case 'C++':
          this.compilerService.compileCPlusPlusCode(program.code).subscribe(
            (compiledCode) => {
              this.socket.emit('compiledCode', compiledCode.stdout);
            }
          );
          break;

        // Sends Python Code to its compiler
        case 'Python':
          this.compilerService.compilePythonCode(program.code).subscribe(
            (compiledCode) => {
              this.socket.emit('compiledCode', compiledCode.stdout);
            }
          );
          break;

        // Send C code to the GNU compiler
        case 'C':
          this.compilerService.compileCCode(program.code).subscribe(
            (compiledCode) => {
              this.socket.emit('compiledCode', compiledCode.stdout);
            }
          );
          break;

        // Send Javascript code to its compiler
        case 'Javascript':
          this.compilerService.compileJavascriptCode(program.code).subscribe(
            (compiledCode) => {
              this.socket.emit('compiledCode', compiledCode.stdout);
            }
          );
          break;

    }
  }
}

