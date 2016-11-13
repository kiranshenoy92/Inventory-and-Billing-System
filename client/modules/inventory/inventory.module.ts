import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule}           from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ShowInventoryComponent } from "./ShowItemsComponent/showItem.component";
import { ShowProductsComponent } from "./ShowProductsComponent/showProduct.component";
import { AddInventoryComponent } from "./AddInventoryComponent/addInventory.component";
import { editItem } from "./EditItemComponent/editItem.component";
import { AddProductComponent } from "./AddProductComponent/addProduct.component";
import { ProductComponent } from "./ProductComponent/product.component";
import { InventoryComponent } from "./InventoryComponent/inventory.component";
import { LoggedInGuard } from '../../service/logged-in.guard';



import { routing } from "./inventory.routing";

@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        CommonModule
        
    ],
    providers: [ LoggedInGuard ],
    declarations: [  AddInventoryComponent , editItem , InventoryComponent , ProductComponent , ShowInventoryComponent , AddProductComponent , ShowProductsComponent],
    bootstrap:    [ AddInventoryComponent ]
})
export class InventoryModule { }


