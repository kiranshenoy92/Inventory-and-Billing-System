import { Component , OnInit} from '@angular/core';
import { UserService } from "../../../service/user.service";
import { Supplier } from "../../Suppliers/supplier";
import { Product }  from "../product";
import { FormBuilder, FormControl, FormGroup , Validators} from "@angular/forms";


@Component({
    selector : 'addInventory-component',
    styleUrls: ['client/modules/Employees/AddEmployeeComponent/addEmployee.component.css'],
    templateUrl: 'client/modules/inventory/AddInventoryComponent/addInventory.component.html',
    providers: [ UserService ]
})

export class AddInventoryComponent implements OnInit {
    suppliers : Supplier;
    products : Product[];
    inventoryForm : FormGroup;
    supplierid : FormControl;
    item_id : FormControl;
    item_sku : FormControl;
    quantity : FormControl;
    costPrice : FormControl;
    sellingPrice : FormControl;
    minSellingPrice : FormControl;

    constructor(private userservice : UserService, private _formBuilder : FormBuilder){
            this.supplierid = new FormControl("",[Validators.required, this.validateNumber]);
            this.costPrice = new FormControl("",[Validators.required, this.validateNumber]);
            this.item_sku = new FormControl({value:"", disabled: 'true'});
            this.quantity = new FormControl("",[Validators.required, this.validateNumber]);
            this.item_id = new FormControl("",Validators.required);
            this.sellingPrice = new FormControl("",[Validators.required, this.validateNumber]);
            this.minSellingPrice = new FormControl("",[Validators.required, this.validateNumber]);

            this.inventoryForm = this._formBuilder.group({
                'supplierid': this.supplierid,
                'item_id': this.item_id,
                'item_sku': this.item_sku,
                'quantity': this.quantity,
                'costPrice': this.costPrice,
                'sellingPrice': this.sellingPrice,
                'minSellingPrice': this.minSellingPrice
            })
    }


    ngOnInit(){
        this.userservice.showSupplier()
            .subscribe(res => {
                this.suppliers = res
                console.log(this.suppliers);
            });
        this.userservice.getProducts()
            .subscribe(res => {
                this.products = res
            })

            
    }


onChange(selected_item_id) {
   for( let product of this.products ) {
       if(product._id == selected_item_id ) {
           this.item_sku = new FormControl({value:product.sku, disabled: 'true'});
       }
   }
}

 validateNumber(costPrice: FormControl) {
  return costPrice.value>0 ? null : {
    validateNumber: {
      valid: false
    }
  };
}

onSubmit(){
    this.userservice.addInventory(this.supplierid.value,this.item_id.value,this.item_sku.value,
        this.quantity.value,this.costPrice.value,this.sellingPrice.value,this.minSellingPrice.value)
        .subscribe(res => {
            if(res.success == true){
                this.inventoryForm.reset();
                alert(res.msg)
            } else {
                alert("some problem occured")
            }
        })
}

}