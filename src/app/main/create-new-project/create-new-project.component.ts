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
  public loadingService: LoadingService,
  private router: Router) { }

  ngOnInit() {
    this.projectName = ''; // Holds the project name that the user types
    this.description = ''; // Holds the descripiton of the project that the user types
    this.language = 'Java'; // Default language selected when modal is opened up
    this.languages = ['Java', 'C++', 'Python', 'C', 'Javascript']; // Displays langauges that can be used in form
    // Creates a new form that holds these variables
    this.form = new FormGroup({
      'projectName': new FormControl(this.projectName, {validators: [Validators.required]}),
      'description': new FormControl(this.description, {validators: [Validators.required]}),
      'language': new FormControl(this.language, {validators: [Validators.required]})
    });
    this.programService.programList = []; // Holds the list of programs
    this.projectService.setCurrentProject(null); // Sets the current project to nothing whenever the user goes back to this page
  }

  /**
   * Creates the project and sends it to the database
   */
  createProject(): void {
    this.loadingService.startLoading(); // Show the loading component
    // Get all values that the user typed in from the forms
    this.projectName = this.form.value.projectName;
    this.description = this.form.value.description;
    this.language = this.form.value.language;

    // Set up the required project information that is needed to send to the backend
    const projectInformation = {
      user: this.userService.getUser()._id,
      name: this.projectName,
      description: this.description,
      language: this.language
    };

    /**
     * Send the project to the backend
     */
    this.projectService.createProject(projectInformation)
    .subscribe(
      // If the backend call was successful
      (res) => {
        console.log(res);
        this.projectService.setCurrentProject(res); // Set the current project to the project they created
        // Add it to the local storage (for page refresh)
        localStorage.setItem('currentProject', JSON.stringify(this.projectService.getCurrentProject()));
        this.projectService.projects.push(this.projectService.getCurrentProject()); // Add the project to projects array
        // Add a main program to the backend cause every project contains a main file
        this.programService.addProgram('Main').subscribe(
          (finalRes) => {
            // Get the program results and push it to the programs array
            const program: Program = {
              name: finalRes.name,
              code: finalRes.code
            };
            // Push the program to the program list for the code editor
            this.programService.programList.push(program);
            // Don't show the loading component
            this.loadingService.stopLoading();
            // Navigate to the project editor page
            this.router.navigate([this.projectService.getCurrentProject().urlKey]);
          },
          (finalErr) => {
            // The case where the main program wasn't added
            console.log('hit error2');
            this.loadingService.stopLoading();
          }
        );
      },
      (err) => {
        console.log('hit error1');
        // The case where the project wasn't created
        this.loadingService.stopLoading();
      }
    );

  }

}
