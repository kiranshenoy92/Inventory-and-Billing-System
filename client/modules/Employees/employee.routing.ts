import { Routes, RouterModule } from '@angular/router';

import { ShowEmployeeComponent } from "./ShowEmployeesComponent/showEmployee.component";
import { AddEmployeeComponent } from "./AddEmployeeComponent/addEmployee.component";
import { EmployeeComponent } from "./EmployeeComponent/employee.component";
import { LoggedInGuard } from '../../service/logged-in.guard';

export const routes: Routes = [
    { path: 'employee/addEmployee', component: AddEmployeeComponent, canActivate: [LoggedInGuard] },
    { path: 'employee/showEmployee', component: ShowEmployeeComponent , canActivate: [LoggedInGuard] },
    { path: 'employee/profile/:id', component: EmployeeComponent , canActivate: [LoggedInGuard] }
];

export const routing = RouterModule.forChild(routes);