import { Component, OnInit } from '@angular/core';
import { CompilerService } from '../../../services/Compiler/compiler.service';

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.css']
})
export class CompilerComponent implements OnInit {

  constructor(private compilerService: CompilerService) { }

  ngOnInit() {
  }

  compile(code): void {
    const compilerEditor = document.getElementById('compiler');
    compilerEditor.innerHTML += '<span style="color:white; margin-left:10px;"> Code is compiling... </span><br/>';

    this.compilerService.compileJavaCode(code).subscribe(
      (compiledCode) => {
        console.log(compiledCode);
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

  }
}
/*
public class Main{
    public static void main(String [] args){
        System.out.println("Hello World");
    }
}
*/
