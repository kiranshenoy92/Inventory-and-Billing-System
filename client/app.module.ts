import { NgModule, CUSTOM_ELEMENTS_SCHEMA , } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }         from '@angular/router';
import { FormsModule}           from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { provideAuth } from "angular2-jwt";
import { HttpModule } from "@angular/http";


import { AppComponent }  from './app.component';

import { NavbarComponent } from "./components/NavbarComponent/navbar.component";
import { LoginComponent } from "./components/LoginComponent/login.component";
import { AboutComponent } from "./components/AboutComponent/about.component";
import { HomeComponent } from "./components/HomeComponent/home.component";
import { LoggedInGuard } from './service/logged-in.guard';
import { UserService } from "./service/user.service";
import { EmployeeModule } from "./modules/Employees/employee.module";
import { SupplierModule } from "./modules/Suppliers/supplier.module";
import { InventoryModule } from "./modules/Inventory/inventory.module";
import { routing } from "./routes";


import { HelloComponent } from "./components/shared/hello.component";
import { ContactModule } from "./modules/contact/contact.module";
import { HomeModule } from "./modules/home/home.module";
import { BillModule } from "./modules/billing/bill.module"

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ContactModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule, 
        HomeModule,
        SupplierModule,
        InventoryModule,
        EmployeeModule,
        BillModule,
        routing,
        CommonModule
    ],
    providers: [UserService, LoggedInGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    declarations: [ HelloComponent, AppComponent , NavbarComponent , LoginComponent , AboutComponent , HomeComponent],
    bootstrap:    [ AppComponent ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }