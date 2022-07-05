import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, Validators, FormBuilder, FormGroup}from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css'],

})
export class GetstartedComponent implements OnInit {

  industry: String[]=['Oil and Gas', 'Hospitality'];
  businesstype: String[]=['Fuel stations', 'Clothing'];
  countrycode: String[]=['+1','+234'];
  gswizarddisplay = true;
  choosenPlan: String = 'any';

  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute, ) { }
  signupForm!: FormGroup;


  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({

      city:             [null, [Validators.required, Validators.maxLength(30)]],
      businessname:     [null, [Validators.required, Validators.maxLength(30)]],
      businesscategory: [null, [Validators.required, Validators.maxLength(30)]],
      accountclass:     [null, [Validators.required, Validators.maxLength(30)]],
      luxurycode:       ['',    [Validators.required, Validators.maxLength(30)]],
      email:            [null, [Validators.required, Validators.maxLength(30)]],
      password:         [null, [Validators.required, Validators.maxLength(30)]],
      accounttype:      'business'
    });


    this.route.paramMap.subscribe(params => {
      this.choosenPlan = params.get('plan')!;
    });

  }

  checkout(){

    // this.router.navigate(['/purchasesummary']);
    this.gswizarddisplay = false;
  }

  pay(){

  }

  backtoWizard(){
    this.gswizarddisplay = true;

  }
}
