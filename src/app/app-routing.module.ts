/**
 * File that controls all possible routes
 * that the user can make in the website and the proper
 * components to display whenever the user accesses
 * a certain route
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectEditorComponent } from './main/project-editor/project-editor.component';
import { AccountComponent } from './main/account/account.component';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'projects',
    component: MainComponent
  },
  {
    path: 'project-editor',
    component: ProjectEditorComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: ':id',
    component: ProjectEditorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
