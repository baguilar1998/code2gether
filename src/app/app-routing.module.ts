import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProjectEditorComponent } from './main/project-editor/project-editor.component';
import { LoadingComponent } from './loading/loading.component';
import { AccountComponent } from './main/account/account.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: './lazy-modules/landing.module#LandingModule'
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
    path: ':user/:id',
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
