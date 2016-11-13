import { Routes, RouterModule } from '@angular/router';

import { CreateBillComponent } from "./CreateBillComponent/createBill.component";
import { ViewBillComponent } from "./ViewBillComponent/viewBill.component";
import { BillDetailsComponent } from "./BillDetailsComponent/billDetail.component";
import { LoggedInGuard } from '../../service/logged-in.guard';

export const routes: Routes = [
    { path: 'billing/createBill', component: CreateBillComponent, canActivate: [LoggedInGuard] },
    { path: 'billing/showBill', component: ViewBillComponent , canActivate: [LoggedInGuard] },
    { path: 'billing/billDetails/:receiptID',component: BillDetailsComponent, canActivate : [LoggedInGuard]}
    
];

export const routing = RouterModule.forChild(routes);