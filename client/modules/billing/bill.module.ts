import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule}           from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CreateBillComponent } from "./CreateBillComponent/createBill.component";
import { ViewBillComponent } from "./ViewBillComponent/viewBill.component";
import { BillDetailsComponent } from "./BillDetailsComponent/billDetail.component";
import { LoggedInGuard } from '../../service/logged-in.guard';
import { routing } from "./bill.routing";

@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        CommonModule
        
    ],
   // exports: [ ProfileComponent ],
    providers: [ LoggedInGuard ],
    declarations: [  CreateBillComponent, ViewBillComponent , BillDetailsComponent],
    bootstrap:    [ ViewBillComponent ]
})
export class BillModule { }