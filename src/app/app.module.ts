import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// MODULE
import { MaterialModule } from "./material/material.module";
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Angular4PaystackModule } from 'angular4-paystack';




// PAGES
import { PlansComponent } from './pages/plans/plans.component';
import { GetstartedComponent } from './pages/getstarted/getstarted.component';
import { PaymentsuccessfulComponent } from './pages/paymentsuccessful/paymentsuccessful.component';
import { PaymentfailedComponent } from './pages/paymentfailed/paymentfailed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './custom_components/toolbar/toolbar.component';
import { PurchasesummaryComponent } from './pages/purchasesummary/purchasesummary.component';
import { SmallfooterComponent } from './custom_components/smallfooter/smallfooter.component';
import { LargefooterComponent } from './custom_components/largefooter/largefooter.component';
import { CustomfooterComponent } from './custom_components/customfooter/customfooter.component';
import { TermspageComponent } from './pages/termspage/termspage.component';
import { PrivacypageComponent } from './pages/privacypage/privacypage.component';
import { CoolbuttonsComponent } from './custom_components/coolbuttons/coolbuttons.component';
import { TermsbottomtextComponent } from './custom_components/termsbottomtext/termsbottomtext.component';
import { EmailtestComponent } from './custom_components/emailtest/emailtest.component';

@NgModule({
  declarations: [
    AppComponent,
    PlansComponent,
    GetstartedComponent,
    PaymentsuccessfulComponent,
    PaymentfailedComponent,
    ToolbarComponent,
    PurchasesummaryComponent,
    SmallfooterComponent,
    LargefooterComponent,
    CustomfooterComponent,
    TermspageComponent,
    PrivacypageComponent,
    CoolbuttonsComponent,
    TermsbottomtextComponent,
    EmailtestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,
    HttpClientModule,
    Angular4PaystackModule.forRoot('pk_test_xxxxxxxxxxxxxxxxxxxxxxxx'),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


