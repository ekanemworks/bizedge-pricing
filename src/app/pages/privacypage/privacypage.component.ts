import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacypage',
  templateUrl: './privacypage.component.html',
  styleUrls: ['./privacypage.component.css']
})
export class PrivacypageComponent implements OnInit {
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
