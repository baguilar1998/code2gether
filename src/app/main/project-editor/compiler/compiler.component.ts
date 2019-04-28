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
    this.socket.on('compiledCode', (output) => {
      console.log('Your output is: ' + output);
    });
  }

  compile(program): void {
    const compilerEditor = document.getElementById('compiler');
    compilerEditor.innerHTML += '<span style="color:white; margin-left:10px;"> Code is compiling... </span><br/>';

    switch (program.language) {
      case 'Java':
        this.compilerService.compileJavaCode(program.code).subscribe(
          (compiledCode) => {
            console.log(compiledCode);
            this.socket.emit('compiledCode', compiledCode.stdout);
            if (!compiledCode.stdout) {
              compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + compiledCode.stderr + '</span><br/>';
            } else {
              compilerEditor.innerHTML += '<span style="color:white; margin-left:10px;">' + compiledCode.stdout + '</span><br/>';
            }
          },
          (runtimeError) => {
            console.log(runtimeError);
            compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + runtimeError.stderr + '</span><br/>';
          }
        );
        break;

        case 'C++':
          this.compilerService.compileCPlusPlusCode(program.code).subscribe(
            (compiledCode) => {
              console.log(compiledCode);
              this.socket.emit('compiledCode', compiledCode.stdout);
              if (!compiledCode.stdout) {
                compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + compiledCode.stderr + '</span><br/>';
              } else {
                compilerEditor.innerHTML += '<span style="color:white; margin-left:10px;">' + compiledCode.stdout + '</span><br/>';
              }
            },
            (runtimeError) => {
              console.log(runtimeError);
              compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + runtimeError.stderr + '</span><br/>';
            }
          );
          break;
        case 'Python':
          this.compilerService.compilePythonCode(program.code).subscribe(
            (compiledCode) => {
              console.log(compiledCode);
              this.socket.emit('compiledCode', compiledCode.stdout);
              if (!compiledCode.stdout) {
                compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + compiledCode.stderr + '</span><br/>';
              } else {
                compilerEditor.innerHTML += '<span style="color:white; margin-left:10px;">' + compiledCode.stdout + '</span><br/>';
              }
            },
            (runtimeError) => {
              console.log(runtimeError);
              compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + runtimeError.stderr + '</span><br/>';
            }
          );
          break;

        case 'C':
          this.compilerService.compileCCode(program.code).subscribe(
            (compiledCode) => {
              console.log(compiledCode);
              this.socket.emit('compiledCode', compiledCode.stdout);
              if (!compiledCode.stdout) {
                compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + compiledCode.stderr + '</span><br/>';
              } else {
                compilerEditor.innerHTML += '<span style="color:white; margin-left:10px;">' + compiledCode.stdout + '</span><br/>';
              }
            },
            (runtimeError) => {
              console.log(runtimeError);
              compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + runtimeError.stderr + '</span><br/>';
            }
          );
          break;

        case 'Javascript':
          this.compilerService.compileJavascriptCode(program.code).subscribe(
            (compiledCode) => {
              console.log(compiledCode);
              this.socket.emit('compiledCode', compiledCode.stdout);
              if (!compiledCode.stdout) {
                compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + compiledCode.stderr + '</span><br/>';
              } else {
                compilerEditor.innerHTML += '<span style="color:white; margin-left:10px;">' + compiledCode.stdout + '</span><br/>';
              }
            },
            (runtimeError) => {
              console.log(runtimeError);
              compilerEditor.innerHTML += '<span style="color:red; margin-left:10px;">' + runtimeError.stderr + '</span><br/>';
            }
          );
          break;

    }
  }
}

