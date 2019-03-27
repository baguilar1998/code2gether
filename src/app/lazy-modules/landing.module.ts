import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from '../landing/landing.component';
import { SigninComponent } from '../landing/signin/signin.component';
import { SignupComponent } from '../landing/signup/signup.component';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LandingComponent,
    SigninComponent,
    SignupComponent
  ],
  exports: [RouterModule]
})

export class LandingModule { }
