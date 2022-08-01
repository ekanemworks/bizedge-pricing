import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termspage',
  templateUrl: './termspage.component.html',
  styleUrls: ['./termspage.component.css']
})
export class TermspageComponent implements OnInit {
  screenSize: any;

  constructor() { }

  ngOnInit(): void {
    this.screenSize = window.innerWidth;

  }
  // RESIZE FUNCTION
  // RESIZE FUNCTION
  // RESIZE FUNCTION
  ScreenSizing(): any {
    
    this.screenSize = window.innerWidth;

  }

}
