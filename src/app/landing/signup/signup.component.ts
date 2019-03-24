import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output() stateChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  changeState(state: string): void {
    this.stateChange.emit(state);
  }
}
