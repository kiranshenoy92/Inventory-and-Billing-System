import { Component } from '@angular/core';
import { UserService } from "../../../service/user.service";
import { FormBuilder, FormControl, FormGroup , Validators} from "@angular/forms"

@Component({
    selector    : 'addEmployee-component',
    styleUrls   : ['client/modules/Employees/AddEmployeeComponent/addEmployee.component.css'],
    templateUrl : 'client/modules/Employees/AddEmployeeComponent/addEmployee.component.html',
    providers   : [ UserService ]
})
export class AddEmployeeComponent {

    displayMsg : string;
    success : boolean = true;

    EmployeeForm    : FormGroup;
    username        : FormControl;
    password        : FormControl;
    firstName       : FormControl;
    secondName      : FormControl;
    address         : FormControl;
    mobileNumber    : FormControl;
    joiningDate     : FormControl;
    dob             : FormControl;
    adminRights     : FormControl;
    constructor ( private userservice : UserService, private employeeFormBuilder : FormBuilder) {
        this.username       = new FormControl('' , Validators.required);
        this.password       = new FormControl('' , Validators.required);
        this.firstName      = new FormControl('' , Validators.required);
        this.secondName     = new FormControl('' , Validators.required);
        this.address        = new FormControl('' , Validators.required);
        this.mobileNumber   = new FormControl('' , [ Validators.required, Validators.pattern('[0-9]{10}')]);
        this.joiningDate    = new FormControl('');
        this.dob            = new FormControl('');
        this.adminRights    = new FormControl('false');

        this.EmployeeForm   = this.employeeFormBuilder.group({
            'username'      : this.username ,
            'password'      : this.password,
            'firstname'     : this.firstName,
            'secondname'    : this.secondName,
            'address'       : this.address,
            'mobileNumber'  : this.mobileNumber,
            'joiningDate'   : this.joiningDate,
            'dob'           : this.dob,
            'adminRights'   : this.adminRights
        })
    }

    onSubmit() {
        this.userservice.addEmployee(this.username.value , this.password.value , this.firstName.value ,
        this.secondName.value , this.address.value, this.mobileNumber.value, this.dob.value,this.joiningDate.value,
        this.adminRights.value)
        .subscribe(res => {
            if(res.success == true){
                //user added successfully
                this.displayMsg = res.msg;
                this.success    = res.success;
                this.EmployeeForm.reset();
                alert(res.msg);
            }
            else if(res.success == false && res.user_exists == true){
                //user already exists
                this.displayMsg = res.msg;
                this.success    = res.success;
                console.log(this.EmployeeForm.value);
                alert(res.msg);
            }
            else {
                console.log("invalide user")
            }
        })
    }


   
}
