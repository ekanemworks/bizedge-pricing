import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  BasicPrice: any;
  SilverPrice: any;
  GoldPrice: any;


  BasicList: any[]=[];
  SilverList: any[]=[];
  GoldList: any[]=[];
  FeaturesList: any[]=[];

  currency: any;
  billingcycle: String = 'Annually';
  isAnnually = true;


  constructor() { }

  ngOnInit(): void {

    this.BasicPrice = 40;
    this.SilverPrice = 90;
    this.GoldPrice = 130;
    this.currency = '$';

    this.BasicList = [true,true];
    this.SilverList = [true,true,true];
    this.GoldList = [true,true,true,true];
    this.FeaturesList = ['RetailPos', '24/7 customer support', 'refund policy'];
    
  }

  toggleBilling(){
    console.log('sasa');
    
    // this.billingcycle = "Monthly";
    if (this.isAnnually == false) {

      this.billingcycle = "Annually";

    }else{
      this.billingcycle = "Monthly";

    }
  }


  

}
