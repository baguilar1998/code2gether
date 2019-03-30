import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showModal: boolean;
  constructor() { }

  ngOnInit() {
    this.showModal = false;
  }

  /**
   * Shows the project modal or not
   * depending on user clicks
   */
  showProjectModal(): void {
    this.showModal = !this.showModal;
  }

}
