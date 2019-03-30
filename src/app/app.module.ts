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
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * ---------------------
 * COMPONENTS IMPORTS
 * ---------------------
 */
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './landing/forgot-password/forgot-password.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { ProjectEditorComponent } from './main/project-editor/project-editor.component';
import { FileListComponent } from './main/file-list/file-list.component';
import { CodeEditorComponent } from './main/project-editor/code-editor/code-editor.component';
import { CompilerComponent } from './main/project-editor/compiler/compiler.component';
import { CreateNewProjectComponent } from './main/create-new-project/create-new-project.component';
import { ProgramFilesComponent } from './main/project-editor/program-files/program-files.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    MainComponent,
    NavbarComponent,
    ProjectEditorComponent,
    FileListComponent,
    CodeEditorComponent,
    CompilerComponent,
    CreateNewProjectComponent,
    ProgramFilesComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
