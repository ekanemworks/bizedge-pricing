import { Component, OnInit, Inject } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { SharedService } from "../../service/shared.service";
import { AppComponent } from "../../app.component";
import { AppConfigModel } from 'src/app/models/appsettings_model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import employees from "../../../assets/appsettings.json";




@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  // DEFINITION
  // DEFINITION
  plansResponse: any[]=[];
  featuresResponse: any[]=[];
  currencySymbol: any;
  billingcycle: String = 'Paid Yearly';
  monthlyPenalty = 0;
  annualpenalty = 1;
  billingcycleMultiplier = this.annualpenalty;
  isAnnually = true;
  flexcontainer = 'flex-container';

  screenSize: any;








  // CONTENT ASSIGNMENT
  BasicPricePerMonthOnMonthly = 7400;
  BasicPricePerMonthOnAnnualy = 6000;
  SilverPricePerMonthOnMonthly = 9110;
  SilverPricePerOnAnnualy = 8500;

  BasicPrice = this.BasicPricePerMonthOnAnnualy
  SilverPrice = this.SilverPricePerOnAnnualy
  BasicList = [true,true];
  SilverList = [true,true,true];
  GoldList = [true,true,true,true];
  FeaturesList = ['RetailPos', '24/7 customer support', 'refund policy'];

  appConfig: any;
  // CONSTRUCTOR
  // CONSTRUCTOR
  // CONSTRUCTOR
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private shared:SharedService,
    private appComponents: AppComponent,
    private http: HttpClient,
    private _snackBar: MatSnackBar, 
    ) 
    {
      // this.appConfig = employees
    }






















  // ng INITIALIZATION
  // ng INITIALIZATION
  // ng INITIALIZATION
  // ng INITIALIZATION
  ngOnInit(): void {
    this.ScreenSizing()
    this.appSettings_Function();
    this.screenSize = window.innerWidth;

    sessionStorage.setItem('picked_billingcycle', 'Yearly');

  }






  // APP SETTINGS FUNCTION
  // APP SETTINGS FUNCTION
  appSettings_Function(){
    this.shared.appSettings_Services().then(response => response.text())
    .then(data => {
      this.appConfig = JSON.parse(data);
      // console.log(this.appConfig);
      
      this.currencySymbol = this.appConfig.currency.symbol;


      // CALL GET FEATURES

      if (sessionStorage.getItem('plansResponse') == null) {
        this.get_plans_function(this.appConfig.baseUrl, this.appConfig.planIndexListUrl,this.appConfig.bizedgeAPIKey,this.appConfig.currency.code);
      }else{
        this.plansResponse =  JSON.parse(sessionStorage.getItem('plansResponse'));
      }

      if (sessionStorage.getItem('featuresResponse') == null) {
        this.get_features_function(this.appConfig.baseUrl, this.appConfig.planCompareListUrl,this.appConfig.bizedgeAPIKey);
      }else{
        this.featuresResponse =  JSON.parse(sessionStorage.getItem('featuresResponse'));
      }
    });
  }


  // GET PLANS FUNCTION
  // GET PLANS FUNCTION
  get_plans_function(api:string,path: string,key:string,currencycode:string){
    var body = {
      code: currencycode
    }
    // call service
    this.shared.post_services_api(api,path,key,body).subscribe({
          next: (v) => {
            var response = JSON.parse(JSON.stringify(v));
            // console.log(v);
            this.plansResponse = response.items

            sessionStorage.setItem('plansResponse',JSON.stringify(this.plansResponse))

          },
          error: (e) => {
            // console.log(e);
            this.openSnackBar(e.message,'close')
          },
          complete: () => console.info('complete') 
        })
  }



  // GET FEATURES FUNCTION
  // GET FEATURES FUNCTION
  get_features_function(api:string,path: string,key:string){

    // call service
    this.shared.get_services_api(api,path,key).subscribe({
          next: (v) => {
            var response = JSON.parse(JSON.stringify(v));
            // console.log(v);
            this.featuresResponse = response.items

            sessionStorage.setItem('featuresResponse',JSON.stringify(this.featuresResponse))

          },
          error: (e) => {
            // console.log(e);
            this.openSnackBar(e.message,'close')
          },
          complete: () => console.info('complete') 
        })
  }



  // TOGGLE CONTROL FUNCTION
  // TOGGLE CONTROL FUNCTION
  // TOGGLE CONTROL FUNCTION
  toggleBilling(){
        if (this.isAnnually == false) {
      this.billingcycle = "Paid Yearly";
      sessionStorage.setItem('picked_billingcycle', 'Yearly');
      this.BasicPrice = this.BasicPricePerMonthOnAnnualy
      this.SilverPrice = this.SilverPricePerOnAnnualy
    }else{
      this.billingcycle = "Paid Monthly";
      sessionStorage.setItem('picked_billingcycle', 'Monthly');
      this.BasicPrice = this.BasicPricePerMonthOnMonthly
      this.SilverPrice = this.SilverPricePerMonthOnMonthly
    }
  }


  calculateMprice(isAnnually,price,monthlypenalty){
    var amount = 0;
    
    if(isAnnually){

      amount = (price/12);

    }else{
      amount = (price/12)*(1+(monthlypenalty/100));
      // console.log((monthlypenalty));
      

    }
    // console.log(amount);
    
    return amount;
  }



  // RESIZE FUNCTION
  // RESIZE FUNCTION
  // RESIZE FUNCTION
  ScreenSizing(): any {
    if (window.innerWidth < 800) {
      this.flexcontainer = ''
    }else{
      this.flexcontainer = 'flex-container'
    }  
    this.screenSize = window.innerWidth;

  }



  // CUSTOM NAVIGATION FUNCTION
  // CUSTOM NAVIGATION FUNCTION
  // CUSTOM NAVIGATION FUNCTION
  navigateTo(parameter: any, rate: any,isAnnually){
    sessionStorage.setItem('currency', this.currencySymbol);
    sessionStorage.setItem('choosenRate', rate.toString());
    if (isAnnually == true) {
      sessionStorage.setItem('billingcycleid', '1');
    }else{
      sessionStorage.setItem('billingcycleid', '2');
    }

    this.router.navigate([parameter])
  }



  // SNACKBAR FUNCTION
  // SNACKBAR FUNCTION
  // SNACKBAR FUNCTION
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: 'center',
      duration: 15000
    });
  }
  

}
