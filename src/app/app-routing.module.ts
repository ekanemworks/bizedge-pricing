import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from "./pages/plans/plans.component";
import { GetstartedComponent } from "./pages/getstarted/getstarted.component";
import { PurchasesummaryComponent } from "./pages/purchasesummary/purchasesummary.component";
import { PaymentsuccessfulComponent } from "./pages/paymentsuccessful/paymentsuccessful.component";
import { PaymentfailedComponent } from "./pages/paymentfailed/paymentfailed.component";
import { TermspageComponent } from "./pages/termspage/termspage.component";
import { PrivacypageComponent } from "./pages/privacypage/privacypage.component";

const routes: Routes = [
  {path:'', component: PlansComponent},
  {path:'getstarted/:plan/:bool', component: GetstartedComponent},
  {path:'purchasesummary', component: PurchasesummaryComponent},
  {path:'paymentsuccess', component: PaymentsuccessfulComponent},
  {path:'paymentfailed', component: PaymentfailedComponent},
  {path:'terms', component: TermspageComponent},
  {path:'privacy', component: PrivacypageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 