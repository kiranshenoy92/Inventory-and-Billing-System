import { Component , OnInit} from '@angular/core';
import { UserService } from "../../../service/user.service";
import { Supplier } from "../../Suppliers/supplier";
import { FormBuilder, FormControl, FormGroup , Validators} from "@angular/forms";
import { Inventory } from "../inventory"

@Component({
    selector : 'showInventory-component',
    styleUrls: ['client/modules/Employees/AddEmployeeComponent/addEmployee.component.css'],
    templateUrl: 'client/modules/inventory/ShowItemsComponent/showItem.component.html',
    providers: [ UserService ]
})

export class ShowInventoryComponent implements OnInit {
   items : Inventory[];

   constructor( private  userservice : UserService) {

   }
    ngOnInit(){
        this.userservice.showInventory()
            .subscribe(res => {
                this.items = res;
                console.log(this.items);
            })
            
    }



}