import { Injectable } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private http: HttpClient) { }


  compileJavaCode(code: string): Observable<any> {
    return this.http.post<any>('//localhost:3000/api/compiler/java', {code: code});
  }

  compileCPlusPlusCode(code: string): Observable<any> {
    return this.http.post<any>('//localhost:3000/api/compiler/cplusplus', {code: code});
  }

  compileCCode(code: string): Observable<any> {
    return this.http.post<any>('//localhost:3000/api/compiler/c', {code: code});
  }

  compilePythonCode(code: string): Observable<any> {
    return this.http.post<any>('//localhost:3000/api/compiler/python', {code: code});
  }

  compileJavascriptCode(code: string): Observable<any> {
    return this.http.post<any>('//localhost:3000/api/compiler/javascript', {code: code});
  }



}
