import { Component, OnInit, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Output() stateChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  changeState(state: string): void {
    this.stateChange.emit(state);
  }
}
