import { Component, OnInit} from '@angular/core';
import { UserService} from '../../../service/user.service';
import { Inventory } from '../inventory';
import { ActivatedRoute } from '@angular/router';

@Component ({
    selector: 'transactionDetail-component',
    templateUrl:'client/modules/inventory/InventoryComponent/inventory.component.html',
    providers: [ UserService ]
})

export class InventoryComponent implements OnInit{
    inventory : Inventory

    constructor( private userservice : UserService, private route :ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params
            .map(params => params['transactionid'])
            .subscribe((transactionid) => {
                this.userservice.getTransactionsDetail(transactionid)
                    .subscribe(res => {
                        this.inventory = res;
                         console.log(this.inventory);
                        
                    })
            })
            

    }

    priceChangeHandler(arg) {
        this.inventory.purchaseCost      = arg[0];
        this.inventory.sellingPrice      = arg[1];
        this.inventory.minSellingPrice   = arg[2];
    }

}