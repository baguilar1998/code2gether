/**
 * A compiler service that holds all necessary
 * data needed for a compiler as well as all the possible
 * backend calls that can be made from compiler route
 */
import { Injectable } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private http: HttpClient) { }


  // Backend call to compile hava code
  compileJavaCode(code: string): Observable<any> {
    return this.http.post<any>('http://code2getherbackend-env.zmbc6ifmpq.us-east-2.elasticbeanstalk.com/api/compiler/java', {code: code});
  }

  // Backend call to compile C++ code
  compileCPlusPlusCode(code: string): Observable<any> {
    return this.http.post<any>('http://code2getherbackend-env.zmbc6ifmpq.us-east-2.elasticbeanstalk.com/api/compiler/cplusplus', {code: code});
  }

  // Backend call to compile C code
  compileCCode(code: string): Observable<any> {
    return this.http.post<any>('http://code2getherbackend-env.zmbc6ifmpq.us-east-2.elasticbeanstalk.com/api/compiler/c', {code: code});
  }

  // Backend call to compile Python code
  compilePythonCode(code: string): Observable<any> {
    return this.http.post<any>('http://code2getherbackend-env.zmbc6ifmpq.us-east-2.elasticbeanstalk.com/api/compiler/python', {code: code});
  }

  // Backend call to compile Java code
  compileJavascriptCode(code: string): Observable<any> {
    return this.http.post<any>('http://code2getherbackend-env.zmbc6ifmpq.us-east-2.elasticbeanstalk.com/api/compiler/javascript', {code: code});
  }



}
