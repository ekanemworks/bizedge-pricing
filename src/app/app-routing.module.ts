import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from "./pages/plans/plans.component";
import { GetstartedComponent } from "./pages/getstarted/getstarted.component";
import { PurchasesummaryComponent } from "./pages/purchasesummary/purchasesummary.component";
import { PaymentsuccessfulComponent } from "./pages/paymentsuccessful/paymentsuccessful.component";
import { PaymentfailedComponent } from "./pages/paymentfailed/paymentfailed.component";
import { TermspageComponent } from "./pages/termspage/termspage.component";
import { PrivacypageComponent } from "./pages/privacypage/privacypage.component";
import { EmailtestComponent } from "./custom_components/emailtest/emailtest.component";

const routes: Routes = [
  {path:'', component: PlansComponent},
  {path:'getstarted/:plan/:id', component: GetstartedComponent},
  {path:'purchasesummary', component: PurchasesummaryComponent},
  {path:'paymentsuccess', component: PaymentsuccessfulComponent},
  {path:'paymentfailed', component: PaymentfailedComponent},
  {path:'terms', component: TermspageComponent},
  {path:'privacypolicy', component: PrivacypageComponent},
  {path:'email', component: EmailtestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 