import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// MODULE
import { MaterialModule } from "./material/material.module";
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

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
    CustomfooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
