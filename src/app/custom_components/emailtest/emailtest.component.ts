import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emailtest',
  templateUrl: './emailtest.component.html',
  styleUrls: ['./emailtest.component.css']
})
export class EmailtestComponent implements OnInit {
  emailDisplay = '1'


  constructor() { }

  ngOnInit(): void {
    this.emailDisplay = '3'

  }

}
