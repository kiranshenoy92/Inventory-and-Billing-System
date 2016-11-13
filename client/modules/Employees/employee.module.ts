import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule}           from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ShowEmployeeComponent } from "./ShowEmployeesComponent/showEmployee.component";
import { AddEmployeeComponent } from "./AddEmployeeComponent/addEmployee.component";
import { LoggedInGuard } from '../../service/logged-in.guard';
import { EmployeeComponent } from "./EmployeeComponent/employee.component";
import { routing } from "./employee.routing";

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
    declarations: [  AddEmployeeComponent, ShowEmployeeComponent , EmployeeComponent],
    bootstrap:    [ ShowEmployeeComponent ]
})
export class EmployeeModule { }