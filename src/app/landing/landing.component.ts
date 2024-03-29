import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/Loading/loading.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  componentState: string; // current state of the landing component
  constructor(public loadingService: LoadingService) {
    this.componentState = 'home';
   }

  ngOnInit() {
    // Removes any projects in the local storage if the user has one
    localStorage.removeItem('currentProject');
  }

  /**
   * Changes the state based off of
   * user clicks
   * @param state the next state to go to
   */
  changeState(state: string): void {
    this.componentState = state;
  }
}
