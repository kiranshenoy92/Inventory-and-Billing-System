import { Routes, RouterModule } from '@angular/router';

import { AddInventoryComponent } from "./AddInventoryComponent/addInventory.component";
import { ShowInventoryComponent } from "./ShowItemsComponent/showItem.component";
import { ShowProductsComponent } from "./ShowProductsComponent/showProduct.component";
import { ProductComponent } from "./ProductComponent/product.component";
import { AddProductComponent } from "./AddProductComponent/addProduct.component";
import { InventoryComponent } from "./InventoryComponent/inventory.component";
import { LoggedInGuard } from '../../service/logged-in.guard';

export const routes: Routes = [
    { path: 'inventory/addInventory', component: AddInventoryComponent, canActivate: [LoggedInGuard] },
    { path: 'inventory/ShowInventory', component: ShowInventoryComponent, canActivate: [LoggedInGuard] },
    { path: 'inventory/addProduct', component: AddProductComponent, canActivate: [LoggedInGuard] },
    { path: 'product/showProducts', component: ShowProductsComponent, canActivate: [LoggedInGuard] },
    { path: 'product/productProfile/:productid', component: ProductComponent, canActivate: [LoggedInGuard] },
    { path: 'inventory/transactionDetail/:transactionid', component: InventoryComponent, canActivate: [LoggedInGuard] }
    
];

export const routing = RouterModule.forChild(routes);