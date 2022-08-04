import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute, } from '@angular/router';

import {FormControl, Validators, FormBuilder, FormGroup}from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient, HttpEventType, } from '@angular/common/http';
import { PaystackOptions } from 'angular4-paystack';
import { DatePipe } from '@angular/common';

import { SharedService } from "../../service/shared.service";
import { AppConfigModel } from 'src/app/models/appsettings_model';




@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css'],

})
export class GetstartedComponent implements OnInit {

  appConfig: any;

  // WIZARD VARIABLES
  // WIZARD VARIABLES
  stepView: boolean[]=[true, false, false, false];
  stepPosition: number = 0;
  stepStatus: String[]=[];
  stepStatusActive: any = 'indicator-point-active';
  stepStatusInactive: any = 'indicator-point';
  hidePasswordBool = 'password';
  companyEmailError = false;
  companyPhoneError = false;
  userEmailError = false;
  userPhoneError = false;


  reference: any = '';
  title: any = '';
  wizardIndex = '1';
  paystackKey = '';
  paystackCurrency = ''
  // paystackCurrency = 'NGN'


  // DROP DOWN OPTIONS
  // DROP DOWN OPTIONS
  industry_options: object[]=[{id:'1', name:'Retail'}];
  businesstype_options: String[]=[];
  location_options: number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  tills_options: number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  billingcycle_options: String[]=['Annually','Monthly'];
  country_options: String[]=[];
  state_options: String[]=[];
  phonecode_options: String[]=[]
  


  currencySymbol: any;
  mobileView = false;





  gswizarddisplay = true;
  choosenPlan: any = 'any';
  choosenPlanId: any;
  choosenRate: any = 0;
  totalPayable: number = 0;


  // ALL FIELDS NEEDED
  picked_industry: any;
  picked_businesstype: any;
  picked_locations: any;
  picked_tills: any;
  picked_billingcycle: any;
  picked_billingcycleid: any;
  picked_businessname: any;
  picked_businessemailaddress: any;
  picked_businessphonecode: any;
  picked_businessphonenumber: any;
  picked_website: any;
  picked_officeaddress: any;
  picked_additionalinfo: any;
  picked_country: any;
  picked_city: any;
  picked_state: any;
  picked_firstname: any;
  picked_lastname: any;
  picked_phonecode: any;
  picked_phonenumber: any;
  picked_personalemailaddress: any;
  picked_password: any;
  picked_months: any;

  today = new Date();
  changedDate: String = '';
  pipe = new DatePipe('en-US');

  options: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute, 
              private _snackBar: MatSnackBar, 
              private http: HttpClient,
              private shared:SharedService,) 
              {

               }

  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;


  ngOnInit(): void {


    this.appSettings_Function();

    this.initializeFormBuilders();

    this.verifySessionStorageActiveTime();


    


    this.route.paramMap.subscribe(params => {
      this.choosenPlan = params.get('plan')!;
    });
    this.route.paramMap.subscribe(params => {
      this.choosenPlanId = params.get('id')!;
    });



    this.currencySymbol = sessionStorage.getItem('currency');
    this.choosenRate =  sessionStorage.getItem('choosenRate');
    this.picked_billingcycle = sessionStorage.getItem('picked_billingcycle');
    this.picked_billingcycleid = sessionStorage.getItem('billingcycleid')

    
    // VERIFY CURRENCY AND AMOUNT IS AVAILABLE
    // VERIFY CURRENCY AND AMOUNT IS AVAILABLE
    if (sessionStorage.getItem('currency') == null) {
      this.router.navigate(['/'])
    }

   
    this.ResizePage();
    this.checkSessionStorage();


    

  }
  // END OF NG ONINIT
  // END OF NG ONINIT
  // END OF NG ONINIT

  // INITIALIZE FORM BUILDERS
  // INITIALIZE FORM BUILDERS
  // INITIALIZE FORM BUILDERS
  initializeFormBuilders(){
    this.step1Form = this.formBuilder.group({
      industry:         [null, [Validators.required, Validators.maxLength(30)]],
      businesstype:     [null, [Validators.required, Validators.maxLength(30)]],
    });

    this.step2Form = this.formBuilder.group({
      locations:          [null, [Validators.required, Validators.maxLength(30)]],
      tills:              [null, [Validators.required, Validators.maxLength(30)]],
    });

    this.step3Form = this.formBuilder.group({
      businessname:             [null, [Validators.required, Validators.maxLength(30)]],
      businessemailaddress:     [null, [Validators.required, Validators.maxLength(30)]],
      businessphonecode:        [null, [Validators.required, Validators.maxLength(30)]],
      businessphonenumber:      [null, [Validators.required, Validators.minLength(9), Validators.maxLength(14), Validators.pattern("^[0-9]*$")]],
      website:                  ['', [ Validators.maxLength(30)]],
      officeaddress:            [null, [Validators.required, Validators.maxLength(30)]],
      additionalinfo:           ['', [ Validators.maxLength(30)]],
      businesscountry:          [null, [Validators.required, Validators.maxLength(30)]],
      businesscity:             [null, [Validators.required, Validators.maxLength(30)]],
      businessstate:            [null, [Validators.required, Validators.maxLength(30)]],
    });

    this.step4Form = this.formBuilder.group({
      firstname:                [null, [Validators.required, Validators.maxLength(30)]],
      lastname:                 [null, [Validators.required, Validators.maxLength(30)]],
      phonecode:                [null, [Validators.required, Validators.maxLength(30)]],
      phonenumber:              [null, [Validators.required, Validators.minLength(9), Validators.maxLength(14),Validators.pattern("^[0-9]*$"),]],
      personalemailaddress:     [null, [Validators.required, Validators.maxLength(40)]],
      password:                 [null, [Validators.required, Validators.minLength(4), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{6,}$")]],
    });
  }























  // APP SETTINGS FUNCTION
  // APP SETTINGS FUNCTION
  appSettings_Function(){
    this.shared.appSettings_Services().then(response => response.text())
    .then(data => {
      this.appConfig = JSON.parse(data);      
      this.currencySymbol = this.appConfig.currency.symbol;
      this.paystackKey = this.appConfig.paystackPublicKey;
      this.paystackCurrency = this.appConfig.currency.code
      
      // CALL GET FEATURES
      this.get_industry_function(this.appConfig.baseUrl, this.appConfig.industryListUrl, this.appConfig.bizedgeAPIKey);
      this.get_country_function();
      this.get_phonecode_function()
    });
  }


  // GET INDUSTRY FUNCTION
  // GET INDUSTRY FUNCTION
  // GET INDUSTRY FUNCTION
  get_industry_function(api:string,path: string,apikey:string){
    // call service
    this.shared.get_services_api(api,path,apikey).subscribe({
          next: (v) => {
            var response = JSON.parse(JSON.stringify(v));
            this.industry_options = response.items;
          },
          error: (e) => {
            this.openSnackBar(e.message,'close')
          },
          complete: () => {console.info('complete') }
        })
  }

  // GET BUSINESSTYPE FUNCTION
  // GET BUSINESSTYPE FUNCTION
  // GET BUSINESSTYPE FUNCTION
  get_businesstype_function(e){
    // this.step1Form.value.businesstype = null;
        
        this.shared.get_services_api_parameter(this.appConfig.baseUrl,this.appConfig.businessTypeListUrl,this.appConfig.bizedgeAPIKey,e).subscribe({
          next: (v) => {
            var response = JSON.parse(JSON.stringify(v));
            // this.step1Form.value.businesstype = response.items[0]['id'];

            this.businesstype_options = response.items;
            this.step1Form.controls['businesstype'].setValue(response.items[0]['id']);
            
          },
          error: (e) => {
            this.openSnackBar(e.message,'close')
          },
          complete: () => {
            console.info('complete') 
          }
        })
  }



  // GET COUNTRY FUNCTION
  // GET COUNTRY FUNCTION
  // GET COUNTRY FUNCTION
  get_country_function(){
    
    this.shared.get_services_api(this.appConfig.baseUrl,this.appConfig.countryListUrl,this.appConfig.bizedgeAPIKey).subscribe({
      next: (v) => {
        var response = JSON.parse(JSON.stringify(v));
        this.country_options = response.items;
      },
      error: (e) => {
        this.openSnackBar(e.message,'close')
      },
      complete: () => {
        console.info('complete') 
      }
    })
  }



  // GET STATE FUNCTION
  // GET STATE FUNCTION
  // GET STATE FUNCTION
  get_state_function(e){
    
    this.shared.get_services_api_parameter(this.appConfig.baseUrl,this.appConfig.stateListUrl,this.appConfig.bizedgeAPIKey,e).subscribe({
      next: (v) => {
        var response = JSON.parse(JSON.stringify(v));
        this.state_options = response.items;
        
        if (response.items.length == 0 || response.items == null) {
          
        }else{
          this.step3Form.controls['businessstate'].setValue(response.items[0]['id']);

        }

      },
      error: (e) => {
        this.openSnackBar(e.message,'close')
      },
      complete: () => console.info('complete') 
    })
  }



  // GET PHONECODE FUNCTION
  // GET PHONECODE FUNCTION
  // GET PHONECODE FUNCTION
  get_phonecode_function(){
    
    this.shared.get_services_api(this.appConfig.baseUrl,this.appConfig.phoneCodeListUrl,this.appConfig.bizedgeAPIKey).subscribe({
      next: (v) => {
        var response = JSON.parse(JSON.stringify(v));
        this.phonecode_options = response.items;
        this.step3Form.controls['businessphonecode'].setValue(response.items[0]);
        this.step4Form.controls['phonecode'].setValue(response.items[0]);
        
      },
      error: (e) => {
        this.openSnackBar(e.message,'close')
      },
      complete: () => {console.info('complete') }
    })
  }







  // CHECK FOR LOCAL STORAGE
  // CHECK FOR LOCAL STORAGE
  // CHECK FOR LOCAL STORAGE
  checkSessionStorage(){
    if (sessionStorage.getItem('currentWizardIndex') == null) {
      this.stepStatus = [this.stepStatusActive,this.stepStatusInactive,this.stepStatusInactive,this.stepStatusInactive ];

    }else if (sessionStorage.getItem('currentWizardIndex') == 'done') {
      this.gswizarddisplay = false;
      this.stepStatus = [this.stepStatusActive,this.stepStatusActive,this.stepStatusActive,this.stepStatusActive ];
      this.stepView = [false,false,false,true];
      this.stepPosition = 3;

      if (this.picked_billingcycle == 'Months')
      {
        this.picked_months = 1
      }else{
        this.picked_months = 12
      }
      this.totalPayable = this.choosenRate * Number(this.picked_tills)  * this.picked_months;
      this.options =  this.payStackOptions(this.paystackKey, this.totalPayable, this.paystackCurrency, this.picked_personalemailaddress);


      this.currencySymbol = sessionStorage.getItem('currency');
      this.choosenRate =  sessionStorage.getItem('choosenRate');

    }else{
      this.currencySymbol = sessionStorage.getItem('currency');
      this.choosenRate =  sessionStorage.getItem('choosenRate');
    }
  }










  // PAYSTACK PAYMENT FUNCTIONS
  // PAYSTACK PAYMENT FUNCTIONS
  // PAYSTACK PAYMENT FUNCTIONS
  // PAYSTACK PAYMENT FUNCTIONS
  // PAYSTACK PAYMENT FUNCTIONS
  paymentInit() {
    
    console.log('Payment initialized');
  }

  paymentDone(response: any) {
    this.title = 'Payment successfull';
    if (response.status == 'success') {

   
      var JsonBody ={
          planid:this.choosenPlanId,
          cycle:this.picked_billingcycle,
          businesstypeid:this.picked_businesstype,
          location:this.picked_locations,
          till:this.picked_tills,
          companyname:this.picked_businessname,
          companyemail:this.picked_businessemailaddress,
          companyphonecode:this.picked_businessphonecode,
          companyphone:this.picked_businessphonenumber,
          website:this.picked_website,
          address1:this.picked_officeaddress,
          address2:this.picked_additionalinfo,
          city:this.picked_city,
          stateid:this.picked_state,
          firstname:this.picked_firstname,
          lastname:this.picked_lastname,
          phonecode:this.picked_phonecode,
          phone:this.picked_phonenumber,
          email:this.picked_personalemailaddress,
          password:this.picked_password,
          bereference:response.reference,
          pgreference:response.transaction,
          paystatus:response.status
      }


      
  // "bereference":"2208031020301220",
  // "pgreference":"2008031020301220",

      

      this.shared.post_services_api(this.appConfig.baseUrl,this.appConfig.companyOnboardUrl,this.appConfig.bizedgeAPIKey,JsonBody).subscribe({
        next: (v) => {
          var response = JSON.parse(JSON.stringify(v));
          
          if (response['errorCode'] == 0) {
            window.location.href = '/paymentsuccess';
            sessionStorage.clear();
          }else{
             this._snackBar.open(response['errorMessage'], 'close',{
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000
            });

            window.location.href = '/paymentfailed';
            sessionStorage.clear();
          }
          


         
        },
        error: (e) => {
          this.openSnackBar(e.message,'close')
        },
        complete: () => console.info('complete') 
      })

    }else{
      window.location.href = '/paymentfailed';
    }
  }

  paymentCancel(ref: any) {
    this.title = 'Payment Cancelled';
  }
  
  // PAYSTACK OPTIONS
  // PAYSTACK OPTIONS
  // PAYSTACK OPTIONS
  payStackOptions(paystackOptionkey: String, paystackOptionAmount:number, paystackOptionCurrency: String, paystackOptionEmail: String){
    var options = {
      key: paystackOptionkey,
      amount: paystackOptionAmount*100,
      currency: paystackOptionCurrency,
      email: paystackOptionEmail,
      ref: this.generateRefernce()
    }
    return options
  }


  generateRefernce(){
    let changedFormat = this.pipe.transform(this.today, 'YYMMddHHmmss');
    this.changedDate = changedFormat == null?'1':changedFormat;
    var str3 = Math.random().toString().substring(2, 6)
    this.reference = `${this.changedDate}${str3}`;
    
    return this.reference;
  }
 







  opensummary(){

    this.gswizarddisplay = false;
    // STEP 1
    this.picked_industry = this.step1Form.value.industry;
    this.picked_businesstype = this.step1Form.value.businesstype;
    // STEP 2
    this.picked_locations = this.step2Form.value.locations;
    this.picked_tills = this.step2Form.value.tills;
    // STEP 3
    this.picked_businessname = this.step3Form.value.businessname;
    this.picked_businessemailaddress = this.step3Form.value.businessemailaddress;
    this.picked_businessphonecode = this.step3Form.value.businessphonecode;
    this.picked_businessphonenumber = this.step3Form.value.businessphonenumber;
    this.picked_website = this.step3Form.value.website;
    this.picked_officeaddress = this.step3Form.value.officeaddress;
    this.picked_additionalinfo = this.step3Form.value.additionalinfo;
    this.picked_country = this.step3Form.value.businesscountry;
    this.picked_city = this.step3Form.value.businesscity;
    this.picked_state = this.step3Form.value.businessstate;
    // STEP 4
    this.picked_firstname = this.step4Form.value.firstname;
    this.picked_lastname = this.step4Form.value.lastname;
    this.picked_phonecode = this.step4Form.value.phonecode;
    this.picked_phonenumber = this.step4Form.value.phonenumber;
    this.picked_personalemailaddress = this.step4Form.value.personalemailaddress;
    this.picked_password = this.step4Form.value.password;

    if (this.picked_billingcycle == 'Yearly') {
      this.picked_months = 12;
    }else{
      this.picked_months = 1;
    }
    this.totalPayable = this.choosenRate * Number(this.picked_tills)  * this.picked_months;

    this.options = this.payStackOptions(this.paystackKey, this.totalPayable, this.paystackCurrency, this.picked_personalemailaddress);

  }


  backtoWizard(){
    this.gswizarddisplay = true;
  }



  ResizePage(): any {
    if (window.innerWidth < 850) {
      this.mobileView = true
    }else{
      this.mobileView = false;
    }
  }


  re_calculatepriceWithTill(till){
    this.choosenRate = Number(sessionStorage.getItem('choosenRate'));
  }


  hidepass(){
    if (this.hidePasswordBool == 'password') {
      this.hidePasswordBool = 'text'
    }else{
      this.hidePasswordBool = 'password'
    }
  }











  // VALIDATION AND STEP NAVIGATION
  // VALIDATION AND STEP NAVIGATION
  // VALIDATION AND STEP NAVIGATION
  step1Validate(){
    if (this.step1Form.valid) {
      this.nextStep();
    }else{
      this.openSnackBar('All Fields Are Required', 'close');
    }
  }

  step2Validate(){
    if (this.step2Form.valid) {
      if (this.step2Form.value.tills>=this.step2Form.value.locations) {
        this.nextStep();
      }else{
        this.openSnackBar('You can`t have more locations than till', 'close');
      }
    }else{
      this.openSnackBar('All Fields Are Required', 'close');
    }
  }


  step3Validate(){
    if (this.step3Form.valid) {

      
      var baseapi = this.appConfig.baseUrl;
      var companyEmailExistUrl = this.appConfig.companyEmailExistUrl;
      var companyPhoneExistUrl = this.appConfig.companyPhoneExistUrl;
      var apiKey = this.appConfig.bizedgeAPIKey;
      var emailParameter = this.step3Form.value.businessemailaddress;
      var businessphonenumber = '';
      // TRIM OFF ZERO IF IT IS FIRST CHARACTER IN PHONENUMBER
      if (this.step3Form.value.businessphonenumber.substring(0,1)==0) {
        businessphonenumber = this.step3Form.value.businessphonenumber.substring(1,this.step3Form.value.businessphonenumber.length)
      }else{
        businessphonenumber = this.step3Form.value.businessphonenumber
      }
      var businessphoneParameter = this.step3Form.value.businessphonecode+'.'+businessphonenumber;
 
      






     
     

        // CHECK IF COMPANY EMAIL EXISIT
        // CHECK IF COMPANY EMAIL EXISIT
        this.shared.get_services_api_parameter(baseapi,companyEmailExistUrl,apiKey, emailParameter).subscribe({
          next: (v) => {

            var emailResponse = JSON.parse(JSON.stringify(v));
          
            if (emailResponse['value'] == true) {
              this.step3Form.controls['businessemailaddress'].setErrors({'incorrect': true});
              this.companyEmailError = true;
            }else{

              // CHECK IF COMPANY PHONE EXISIT
              // CHECK IF COMPANY PHONE EXISIT
              this.shared.get_services_api_parameter(baseapi,companyPhoneExistUrl,apiKey,businessphoneParameter).subscribe({
                next: (v) => {
                  
                  var phoneCheckResponse = JSON.parse(JSON.stringify(v));
                
                  if (phoneCheckResponse['value'] == true) {
                    
                    this.step3Form.controls['businessphonenumber'].setErrors({'incorrect': true});
                    this.companyPhoneError = true;
                  }else{
                      this.nextStep();
                  }
                },
                error: (e) => {
                  this.openSnackBar(e.message,'close')
                },
                complete: () => {console.info('complete') }
              });
              // End of company phone check

            }

          },
          error: (e) => {
            this.openSnackBar(e.message,'close')
          },
          complete: () => {
            console.info('complete') 
          }
        });

      
      
    }else{
      this.openSnackBar('Fill the Required Fields', 'close');
    }
  }










  step4Validate(){
    if (this.step4Form.valid) {


     
      
      var baseapi = this.appConfig.baseUrl;
      var userEmailExistUrl = this.appConfig.userEmailExistUrl;
      var userPhoneExistUrl = this.appConfig.userPhoneExistUrl;
      var apiKey = this.appConfig.bizedgeAPIKey;
      var emailParameter = this.step4Form.value.personalemailaddress;
      var phonenumber = '';
      // TRIM OFF ZERO IF IT IS FIRST CHARACTER IN PHONENUMBER
      if (this.step4Form.value.phonenumber.substring(0,1)==0) {
        phonenumber = this.step4Form.value.phonenumber.substring(1,this.step4Form.value.phonenumber.length)
      }else{
        phonenumber = this.step4Form.value.phonenumber
      }
      var phonenumberParameter = this.step4Form.value.phonecode+'.'+phonenumber;
 
      

     

        // CHECK IF USER EMAIL EXISIT
        // CHECK IF USER EMAIL EXISIT
        this.shared.get_services_api_parameter(baseapi,userEmailExistUrl,apiKey, emailParameter).subscribe({
          next: (v) => {

            var emailResponse = JSON.parse(JSON.stringify(v));
          
            if (emailResponse['value'] == true) {
              this.step4Form.controls['personalemailaddress'].setErrors({'incorrect': true});
              this.userEmailError = true;
            }else{

              // CHECK IF USER PHONE EXISIT
              // CHECK IF USER PHONE EXISIT
              this.shared.get_services_api_parameter(baseapi,userPhoneExistUrl,apiKey,phonenumberParameter).subscribe({
                next: (v) => {
                  
                  var phoneCheckResponse = JSON.parse(JSON.stringify(v));
                
                  if (phoneCheckResponse['value'] == true) {
                    
                    this.step4Form.controls['phonenumber'].setErrors({'incorrect': true});
                    this.userPhoneError = true;
                  }else{
                    this.opensummary();

                  }
                },
                error: (e) => {
                  this.openSnackBar(e.message,'close')
                },
                complete: () => {
                  console.info('complete')
                } 
              });
              // End of company phone check

            }

          },
          error: (e) => {
            this.openSnackBar(e.message,'close')
          },
          complete: () => {
            console.info('complete') 
          }
        });



    }else{
      this.openSnackBar('Invalid input detected: Fill All Correctly', 'close');
    }
  }


  nextStep(){
    this.stepView[this.stepPosition] = false;
    this.stepPosition = this.stepPosition+1;
    this.stepView[this.stepPosition] = true;
    this.stepStatus[this.stepPosition] = this.stepStatusActive;
    
    this.wizardIndex = JSON.stringify(this.stepPosition);
 }

 previousStep(){
   this.stepView[this.stepPosition] = false;
   this.stepStatus[this.stepPosition] = this.stepStatusInactive;
   this.stepPosition = this.stepPosition-1;
   this.stepView[this.stepPosition] = true;

   this.wizardIndex = JSON.stringify(this.stepPosition);
 }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }







  // VERIFY LOCALSTORAGE TIME
  // VERIFY LOCALSTORAGE TIME
  // VERIFY LOCALSTORAGE TIME
  verifySessionStorageActiveTime(){
    if (sessionStorage.getItem('destroyD') == null) {

      var nextDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      var nDay = nextDate.getDate()
      var nMonth = nextDate.getMonth()+1
      var nYear = nextDate.getFullYear()
      var nextDay = nYear.toString()+nMonth.toString()+nDay.toString();
      sessionStorage.setItem('destroyD',nextDay);
    }else{

      var currentDate = new Date();
      var cDay = currentDate.getDate()
      var cMonth = currentDate.getMonth()+1
      var cYear = currentDate.getFullYear()
      var currentDay = cYear.toString()+cMonth.toString()+cDay.toString();

      if (sessionStorage.getItem('destroyD')! == currentDay) {
        sessionStorage.clear();  
        this.router.navigate(['/'])
      }

    }
  }

  removeErr(){
    this.companyEmailError = false;
    this.companyPhoneError = false;

    this.userPhoneError = false;
    this.userEmailError =  false
  }




}
