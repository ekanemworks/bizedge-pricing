import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, Validators, FormBuilder, FormGroup}from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient, HttpEventType, } from '@angular/common/http';



@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css'],

})
export class GetstartedComponent implements OnInit {

  stepView: boolean[]=[true, false, false, false];
  stepPosition: number = 0;
  stepStatus: String[]=[];
  stepStatusActive: any = 'indicator-point-active';
  stepStatusInactive: any = 'indicator-point';


  // DROP DOWN OPTIONS
  industry_options: String[]=['Oil and Gas', 'Hospitality'];
  businesstype_options: String[]=['Fuel stations', 'Clothing'];
  location_options: number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  tills_options: number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  billingcycle_options: String[]=['Annually','Monthly'];
  country_options: String[]=['Nigeria', 'Ghana', 'Canada', 'United States'];
  state_options: String[]=['Lagos', 'Abuja'];
  countrycode_options: String[]=['+234','+1']
  currency = '$';
  mobileView = false;





  gswizarddisplay = true;
  choosenPlan: String = 'any';
  choosenRate: number = 90;
  totalPayable: number = 0;
  isSummary: String = '0';


  // ALL FIELDS NEEDED
  picked_industry: any;
  picked_businesstype: any;
  picked_locations: any;
  picked_tills: any;
  picked_billingcycle: any;
  picked_businessname: any;
  picked_businessemailaddress: any;
  picked_website: any;
  picked_officeaddress: any;
  picked_additionalinfo: any;
  picked_country: any;
  picked_city: any;
  picked_state: any;
  picked_firstname: any;
  picked_lastname: any;
  picked_code: any;
  picked_phonenumber: any;
  picked_personalemailaddress: any;
  picked_password: any;
  picked_months: any;




  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute, private _snackBar: MatSnackBar, private http: HttpClient) { }
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;


  ngOnInit(): void {

    this.step1Form = this.formBuilder.group({
      industry:         [null, [Validators.required, Validators.maxLength(30)]],
      businesstype:     [null, [Validators.required, Validators.maxLength(30)]],
    });

    this.step2Form = this.formBuilder.group({
      locations:         [null, [Validators.required, Validators.maxLength(30)]],
      tills:     [null, [Validators.required, Validators.maxLength(30)]],
      billingcycle:     [null, [Validators.required, Validators.maxLength(30)]],
    });

    this.step3Form = this.formBuilder.group({
      businessname:     [null, [Validators.required, Validators.maxLength(30)]],
      businessemailaddress:     [null, [Validators.required, Validators.maxLength(30)]],
      website:          [null, [Validators.required, Validators.maxLength(30)]],
      officeaddress:    [null, [Validators.required, Validators.maxLength(30)]],
      additionalinfo:   [null, [Validators.required, Validators.maxLength(30)]],
      country:          [null, [Validators.required, Validators.maxLength(30)]],
      city:             [null, [Validators.required, Validators.maxLength(30)]],
      state:            [null, [Validators.required, Validators.maxLength(30)]],
    });

    this.step4Form = this.formBuilder.group({
      firstname:                [null, [Validators.required, Validators.maxLength(30)]],
      lastname:                 [null, [Validators.required, Validators.maxLength(30)]],
      code:                     [null, [Validators.required, Validators.maxLength(30)]],
      phonenumber:              [null, [Validators.required, Validators.minLength(9),Validators.pattern("^[0-9]*$"),]],
      personalemailaddress:     [null, [Validators.required, Validators.maxLength(40)]],
      password:                 [null, [Validators.required, Validators.minLength(4)]],
    });


    this.route.paramMap.subscribe(params => {
      this.choosenPlan = params.get('plan')!;
    });
    this.route.paramMap.subscribe(params => {
      this.isSummary = params.get('bool')!;
    });
    this.stepStatus = [this.stepStatusActive,this.stepStatusInactive,this.stepStatusInactive,this.stepStatusInactive ];


    // meaning wizard has been filled and was on Summary before
    if (this.isSummary == '1') {
      this.gswizarddisplay = false;
      this.stepStatus = [this.stepStatusActive,this.stepStatusActive,this.stepStatusActive,this.stepStatusActive ];
      this.stepView = [false,false,false,true];
      this.stepPosition = 3;
    }

    this.ResizePage();


  }

  step1Validate(){

    if (this.step1Form.valid) {
      this.nextStep();

    }else{
      this.openSnackBar('All Fields Are Required', 'close');

    }


  }

  step2Validate(){
    if (this.step2Form.valid) {
      this.nextStep();

    }else{
      this.openSnackBar('All Fields Are Required', 'close');

    }
  }


  step3Validate(){
    if (this.step3Form.valid) {
      this.nextStep();
    }else{
      this.openSnackBar('All Fields Are Required', 'close');

    }
  }

  step4Validate(){
    if (this.step3Form.valid) {
      this.checkout();
    }else{
      this.openSnackBar('All Fields Are Required', 'close');

    }
  }





  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }




  nextStep(){
     this.stepView[this.stepPosition] = false;
     this.stepPosition = this.stepPosition+1;
     this.stepView[this.stepPosition] = true;
     this.stepStatus[this.stepPosition] = this.stepStatusActive;
  }

  previousStep(){
    this.stepView[this.stepPosition] = false;
    this.stepStatus[this.stepPosition] = this.stepStatusInactive;
    this.stepPosition = this.stepPosition-1;
    this.stepView[this.stepPosition] = true;
  }

  checkout(){

    // this.router.navigate(['/purchasesummary']);
    this.gswizarddisplay = false;


    
    this.picked_industry = this.step1Form.value.industry;
    this.picked_businesstype = this.step1Form.value.businesstype;

    this.picked_locations = this.step2Form.value.locations;
    this.picked_tills = this.step2Form.value.tills;
    this.picked_billingcycle = this.step2Form.value.billingcycle;

    this.picked_businessname = this.step3Form.value.businessname;
    this.picked_businessemailaddress = this.step3Form.value.businessemailaddress;
    this.picked_website = this.step3Form.value.website;
    this.picked_officeaddress = this.step3Form.value.officeaddress;
    this.picked_additionalinfo = this.step3Form.value.additionalinfo;
    this.picked_country = this.step3Form.value.country;
    this.picked_city = this.step3Form.value.city;
    this.picked_state = this.step3Form.value.state;

    this.picked_firstname = this.step4Form.value.firstname;
    this.picked_lastname = this.step4Form.value.lastname;
    this.picked_code = this.step4Form.value.code;
    this.picked_phonenumber = this.step4Form.value.phonenumber;
    this.picked_personalemailaddress = this.step4Form.value.personalemailaddress;
    this.picked_password = this.step4Form.value.password;



    if (this.picked_billingcycle == 'Annually') {
      this.picked_months = 12;
    }else{
      this.picked_months = 1;
    }





    this.totalPayable = this.choosenRate * Number(this.picked_tills)  * this.picked_months
  }

  pay(){

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
    // this.chamberOrientation()      
  
  }

  alertmeTS(){


    alert('Ekanem');



    // API WILL CREATE PAGE ON PAYSTACK AND I AM REDIRECTING TO THE PAGE
    // API WILL CREATE PAGE ON PAYSTACK AND I AM REDIRECTING TO THE PAGE
    // API WILL CREATE PAGE ON PAYSTACK AND I AM REDIRECTING TO THE PAGE
    
    // const params = JSON.stringify({
    //   "name": "Buttercup Brunch",
    //   "description": "Gather your friends for the ritual that is brunch",
    //   "amount": 5000000,
    //   "redirect_url": "http://localhost:4200/paymentsuccess"
    // })

    // this.http.post('https://api.paystack.co' +'/page', params, {
    //   headers: {
    //     Authorization: 'Bearer sk_test_c785e30cd2231b6b99ef6796e432f1089cff1bd2',
    //     'Content-Type': 'application/json'
    //   }}).subscribe(data => {

    //     var  daat =  JSON.stringify(data); 
    //     var studentMap = {
    //       status: '',
    //       data: {slug: ''},
    //     };

    //     studentMap =  JSON.parse(daat); 
    //     // studentMap.set()
    //       console.log(studentMap.data.slug);
    //       window.location.href = "https://paystack.com/pay/"+studentMap.data.slug

    //   });







    // const params = JSON.stringify({
    //   "email": "customer@email.com",
    //   "amount": "20000"
    // })

    // this.http.post('https://api.paystack.co' +'/transaction/initialize', params, {
    //   headers: {
    //     Authorization: 'Bearer sk_test_c785e30cd2231b6b99ef6796e432f1089cff1bd2',
    //     'Content-Type': 'application/json'
    //   },
    //   reportProgress: true,
    //   observe: 'events'
    //     })
    //     .subscribe(event => {
    //       console.log(event);
          
    //     });

  }
}
