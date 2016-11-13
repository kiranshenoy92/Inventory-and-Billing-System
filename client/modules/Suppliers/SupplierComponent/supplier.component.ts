import { Component , OnInit} from '@angular/core';
import { UserService } from "../../../service/user.service";
import { Supplier } from "../supplier";
import { ActivatedRoute } from "@angular/router";
import { Inventory } from "../../inventory/inventory";
@Component({
    selector: 'showSuppliersProfile-component',
    templateUrl: 'client/modules/Suppliers/SupplierComponent/supplier.component.html',
    providers: [ UserService ]
})
export class SupplierComponent implements OnInit{ 
    supplier : Supplier;
    inventorys : Inventory[];
    lenght : number;
    constructor ( private userservice : UserService , private _route : ActivatedRoute ) {
        
    }

    ngOnInit(){
        this._route.params
            .map(param => param["id"])
            .subscribe((id) => {
                this.userservice
                    .showSupplierProfile(id)
                    .subscribe(res => {
                       this.supplier = res;
                    })
                this.userservice
                    .getTransactions(id)
                    .subscribe( res => {
                        this.inventorys = res;
                        this.lenght = this.inventorys.length;
                    })

            })

    }
  
}