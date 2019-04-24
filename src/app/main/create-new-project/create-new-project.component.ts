import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { ProjectService } from '../../services/Project/project.service';
import { Router } from '../../../../node_modules/@angular/router';
import { LoadingService } from '../../services/Loading/loading.service';
import { ProgramService } from '../../services/Program/program.service';
import { Program } from '../../models/Program';
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
  constructor(private userService: UserService,
  private projectService: ProjectService,
  private programService: ProgramService,
  private loadingService: LoadingService,
  private router: Router) { }

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
    this.programService.programList = [];
    this.projectService.setCurrentProject(null);
  }

  createProject(): void {
    this.loadingService.startLoading();
    this.projectName = this.form.value.projectName;
    this.description = this.form.value.description;
    this.language = this.form.value.language;

    const projectInformation = {
      user: this.userService.getUser()._id,
      name: this.projectName,
      description: this.description,
      language: this.language
    };

    this.projectService.createProject(projectInformation)
    .subscribe(
      (res) => {
        console.log(res);
        this.projectService.setCurrentProject(res);
        this.projectService.projects.push(this.projectService.getCurrentProject());
        this.programService.addProgram('Main').subscribe(
          (finalRes) => {
            // Get the program results and push it to the programs array
            const program: Program = {
              name: finalRes.name,
              code: finalRes.code
            };
            this.programService.programList.push(program);
            this.loadingService.stopLoading();
            this.router.navigate([this.userService.getUser().username, this.projectService.getCurrentProject().urlKey]);
          },
          (finalErr) => {
            console.log('hit error2');
            this.loadingService.stopLoading();
          }
        );
      },
      (err) => {
        console.log('hit error1');
        this.loadingService.stopLoading();
      }
    );

  }

}
