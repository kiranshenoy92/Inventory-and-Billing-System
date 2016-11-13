import { Component , OnInit} from '@angular/core';
import { UserService } from "../../../service/user.service";
import { Supplier } from "../../Suppliers/supplier";
import { FormBuilder, FormControl, FormGroup , Validators} from "@angular/forms";

@Component({
    selector : 'addProduct-component',
    styleUrls: ['client/modules/Employees/AddEmployeeComponent/addEmployee.component.css'],
    templateUrl: 'client/modules/inventory/AddProductComponent/addProduct.component.html',
    providers: [ UserService ]
})

export class AddProductComponent implements OnInit {
    suppliers : Supplier;

    ProductForm : FormGroup;
    itemName : FormControl;
    itemDesc : FormControl;
    sku : FormControl;

    constructor(private userservice : UserService, private _formBuilder : FormBuilder){
            this.itemName = new FormControl("",[Validators.required]);
            this.sku = new FormControl("",[Validators.required, this.validateNumber]);
            this.itemDesc = new FormControl("",[Validators.required]);
           

            this.ProductForm = this._formBuilder.group({
                'itemName': this.itemName,
                'sku': this.sku,
                'itemDesc': this.itemDesc
            })
    }


    ngOnInit(){

    }



 validateNumber(costPrice: FormControl) {
  return costPrice.value>0 ? null : {
    validateNumber: {
      valid: false
    }
  };
}

onSubmit(){
}

}