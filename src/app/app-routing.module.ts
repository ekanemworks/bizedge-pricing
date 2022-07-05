import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from "./pages/plans/plans.component";
import { GetstartedComponent } from "./pages/getstarted/getstarted.component";
import { PurchasesummaryComponent } from "./pages/purchasesummary/purchasesummary.component";
import { PaymentsuccessfulComponent } from "./pages/paymentsuccessful/paymentsuccessful.component";
import { PaymentfailedComponent } from "./pages/paymentfailed/paymentfailed.component";

const routes: Routes = [
  {path:'', component: PlansComponent},
  {path:'getstarted/:plan', component: GetstartedComponent},
  {path:'purchasesummary', component: PurchasesummaryComponent},
  {path:'paymentsuccess', component: PaymentsuccessfulComponent},
  {path:'paymentfailed', component: PaymentfailedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 