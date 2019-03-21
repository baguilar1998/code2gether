/**
 * ----------------------
 * CONSTANTS
 * ---------------------
 */
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };


/**
 * ---------------------
 * MODULE IMPORTS
 * ---------------------
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

/**
 * ---------------------
 * COMPONENTS IMPORTS
 * ---------------------
 */
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './landing/signup/signup.component';
import { SigninComponent } from './landing/signin/signin.component';
import { ForgotPasswordComponent } from './landing/forgot-password/forgot-password.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { ProjectEditorComponent } from './main/project-editor/project-editor.component';
import { FileListComponent } from './main/project-editor/file-list/file-list.component';
import { CodeEditorComponent } from './main/project-editor/code-editor/code-editor.component';
import { CompilerComponent } from './main/project-editor/compiler/compiler.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
    MainComponent,
    NavbarComponent,
    ProjectEditorComponent,
    FileListComponent,
    CodeEditorComponent,
    CompilerComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
