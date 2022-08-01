import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-largefooter',
  templateUrl: './largefooter.component.html',
  styleUrls: ['./largefooter.component.css']
})
export class LargefooterComponent implements OnInit {

  @Input() message: any;
  constructor() { }

  ngOnInit(): void {
    
  }

  


  // RESIZE FUNCTION
  // RESIZE FUNCTION
  // RESIZE FUNCTION
  ScreenSizing(): any {

    if (window.innerWidth < 800) {

    }else{
    }  

  }

}
