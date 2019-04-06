import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.css']
})
export class CreateNewProjectComponent implements OnInit {

  languages: string[];
  projectName: string;
  description: string;
  language: string;
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.projectName = '';
    this.description = '';
    this.language = 'Java';
    this.languages = ['Java', 'C++', 'Python', 'C', 'Javascript'];
    this.form = new FormGroup({
      'projectName': new FormControl(this.projectName, {validators: [Validators.required]}),
      'description': new FormControl(this.description, {validators: [Validators.required]}),
      'language': new FormControl(this.language, {validators: [Validators.required]})
    });
  }

  createProject(): void {
    this.projectName = this.form.value.projectName;
    this.description = this.form.value.description;
    this.language = this.form.value.language;

  }

}
