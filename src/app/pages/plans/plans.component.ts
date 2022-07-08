import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  BasicPrice: any;
  SilverPrice: any;

  BasicPriceMonthly: any;
  SilverPriceMonthly: any;

  BasicPriceAnnualy: any;
  SilverPriceAnnualy: any;



  BasicList: any[]=[];
  SilverList: any[]=[];
  GoldList: any[]=[];
  FeaturesList: any[]=[];

  currency: any;
  billingcycle: String = 'Paid Annually';
  isAnnually = true;

  flexcontainer = 'flex-container';


  constructor() { }

  ngOnInit(): void {

    this.BasicPriceMonthly = 44;
    this.SilverPriceMonthly = 110;

    this.BasicPriceAnnualy = 40;
    this.SilverPriceAnnualy = 90;
    this.currency = '$';


    this.BasicPrice = this.BasicPriceAnnualy
    this.SilverPrice = this.SilverPriceAnnualy

    this.BasicList = [true,true];
    this.SilverList = [true,true,true];
    this.GoldList = [true,true,true,true];
    this.FeaturesList = ['RetailPos', '24/7 customer support', 'refund policy'];
    this.ResizePage()
  }

  toggleBilling(){
    
    // this.billingcycle = "Monthly";
    if (this.isAnnually == false) {
      this.billingcycle = "Paid Annually";
      this.BasicPrice = this.BasicPriceAnnualy
      this.SilverPrice = this.SilverPriceAnnualy
    }else{
      this.billingcycle = "Paid Monthly";
      this.BasicPrice = this.BasicPriceMonthly
      this.SilverPrice = this.SilverPriceMonthly
    }
  }


  ResizePage(): any {
    if (window.innerWidth < 850) {
      this.flexcontainer = ''
    }else{
      this.flexcontainer = 'flex-container'

    }
    // this.chamberOrientation()      
  
  }


  

}
