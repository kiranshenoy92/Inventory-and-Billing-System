import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule}           from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ShowSupplierComponent } from "./ShowSuppliersComponent/showSupplier.component";
import { AddSupplierComponent } from "./AddSupplierComponent/addSupplier.component";
import { LoggedInGuard } from '../../service/logged-in.guard';
import { SupplierComponent } from "./SupplierComponent/supplier.component";
import { routing } from "./supplier.routing";

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
    declarations: [  AddSupplierComponent, ShowSupplierComponent , SupplierComponent ],
    bootstrap:    [ ShowSupplierComponent ]
})
export class SupplierModule { }