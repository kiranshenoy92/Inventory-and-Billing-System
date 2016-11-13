import { Component,OnInit } from '@angular/core';
import { UserService } from "../../../service/user.service";
import { Product } from "../product";
import { Inventory } from "../inventory";

@Component({
    selector : 'showProduct-component',
    templateUrl : 'client/modules/inventory/ShowProductsComponent/showProduct.component.html',
    providers: [ UserService ]
})

export class  ShowProductsComponent implements OnInit {
    products : Product[];
    inventory :  Inventory[];
    constructor(private userservice : UserService) {

    }

    ngOnInit() {
         this.userservice.showInventory()
            .subscribe( res => {
                this.inventory = res
                console.log(this.inventory);
            })
        this.userservice.getProducts()
            .subscribe(res => {
                this.products = res
            })
       

        
    }


    stockCheck(product_id) {
        for(let item of this.inventory) {
           console.log("comparing "+ item.product_id._id +" with "+product_id) 
           if( item.product_id._id == product_id ) {
               return true
           }
        }
        return false
    }
}