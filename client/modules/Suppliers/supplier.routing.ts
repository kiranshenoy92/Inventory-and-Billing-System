import { Routes, RouterModule } from '@angular/router';

import { ShowSupplierComponent } from "./ShowSuppliersComponent/showSupplier.component";
import { AddSupplierComponent } from "./AddSupplierComponent/addSupplier.component";
import { SupplierComponent } from "./SupplierComponent/supplier.component";
import { LoggedInGuard } from '../../service/logged-in.guard';

export const routes: Routes = [
    { path: 'supplier/addSupplier', component: AddSupplierComponent, canActivate: [LoggedInGuard] },
    { path: 'supplier/showSupplier', component: ShowSupplierComponent , canActivate: [LoggedInGuard] },
    { path: 'supplier/profile/:id', component: SupplierComponent , canActivate: [LoggedInGuard] }
];

export const routing = RouterModule.forChild(routes);