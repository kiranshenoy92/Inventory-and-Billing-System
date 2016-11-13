import { Component, OnInit} from '@angular/core';
import { UserService} from '../../../service/user.service';
import { Product } from '../product';
import { Inventory } from '../inventory';
import { ActivatedRoute } from '@angular/router';

@Component ({
    selector: 'product-component',
    templateUrl:'client/modules/inventory/ProductComponent/product.component.html',
    providers: [ UserService ]
})

export class ProductComponent implements OnInit{
    product : Product;
    inventorys : Inventory[];
    length :number;

    constructor( private userservice : UserService, private route :ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params
            .map(params => params['productid'])
            .subscribe((productid) => {
                this.userservice.getProductProfile(productid)
                    .subscribe(res => {
                        this.product = res
                       
                    })
                this.userservice.getProductTransactions(productid)
                    .subscribe(res => {
                        this.inventorys = res;
                         console.log(this.inventorys);
                        this.length = this.inventorys.length;
                    })
            })
            

    }
}