import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  componentState: string;
  constructor() {
    this.componentState = 'home';
   }

  ngOnInit() {
  }

  changeState(state: string): void {
    this.componentState = state;
  }
}
