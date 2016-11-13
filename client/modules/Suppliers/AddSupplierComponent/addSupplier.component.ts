import { Component } from '@angular/core';
import { UserService } from "../../../service/user.service";
import { FormBuilder, FormControl, FormGroup , Validators} from "@angular/forms"

@Component({
    selector: 'addSaupplier-component',
    //styleUrls: ['client/modules/Employees/AddEmployeeComponent/addEmployee.component.css'],
    templateUrl: 'client/modules/Suppliers/AddSupplierComponent/addSupplier.component.html',
    providers: [ UserService ]
})
export class AddSupplierComponent {

    displayMsg : string;
    success : boolean = true;

    SupplierForm : FormGroup;
    supplierName : FormControl;
    location : FormControl;
    address : FormControl;
    mobileNumber : FormControl;
    bank_details : FormControl;
    constructor ( private userservice : UserService, private supplierFormBuilder : FormBuilder) {
        this.supplierName = new FormControl('' , Validators.required);
        this.location = new FormControl('' , Validators.required);
        this.address = new FormControl('' , Validators.required);
        this.mobileNumber = new FormControl('' , [ Validators.required, Validators.pattern('[0-9]{10}')]);
        this.bank_details = new FormControl('', Validators.required);

        this.SupplierForm = this.supplierFormBuilder.group({
            'supplierName' : this.supplierName ,
            'location' : this.location,
            'bank_details' : this.bank_details,
            'address' : this.address,
            'mobileNumber' : this.mobileNumber
        })
    }

    onSubmit() {
        this.userservice.addSuppier(this.supplierName.value , this.location.value 
        ,  this.address.value, this.mobileNumber.value,
        this.bank_details.value)
        .subscribe(res => {
            if(res.success == true){
                //supplier added successfully
                this.displayMsg = res.msg;
                this.success = res.success;
                this.SupplierForm.reset();
                alert(res.msg);
            }
            else if(res.success == false){
                //supplier already exists
                this.displayMsg = res.msg;
                this.success = res.success;
                 alert(res.msg);
            }
            else {
                console.log("invalide user")
            }
        })
    }


   
}
