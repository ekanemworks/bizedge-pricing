import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customfooter',
  templateUrl: './customfooter.component.html',
  styleUrls: ['./customfooter.component.css']
})
export class CustomfooterComponent implements OnInit {

  constructor() { }
  cYear
  ngOnInit(): void {

    var currentDate = new Date();
   this.cYear = currentDate.getFullYear()
  }



}
